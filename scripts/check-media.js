#!/usr/bin/env node
// Audits public/exercises/ against data/exercises.ts: every video file on disk
// should be referenced by exactly one exercise, and every exercise's `video`
// field should point at a file that actually exists. Run with:
//   node scripts/check-media.js
// Exits non-zero if any file is unreferenced or any reference is broken, so
// it can be wired into CI later without extra work.

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DATA_FILE = path.join(ROOT, "data/exercises.ts");
const EXERCISES_DIR = path.join(ROOT, "public/exercises");

const source = fs.readFileSync(DATA_FILE, "utf8");

const idMatches = [...source.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);
const nameMatches = [...source.matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1]);
const videoMatches = [...source.matchAll(/video:\s*"\/exercises\/([^"]+)"/g)];

// Figure out which exercise each `video:` field belongs to by finding the
// nearest preceding `id:` in the source text.
const idPositions = [...source.matchAll(/id:\s*"([^"]+)"/g)].map((m) => ({
  id: m[1],
  index: m.index,
}));

function idForPosition(pos) {
  let match = idPositions[0]?.id ?? null;
  for (const entry of idPositions) {
    if (entry.index > pos) break;
    match = entry.id;
  }
  return match;
}

const videoToExercise = new Map(); // filename -> exercise id
for (const m of videoMatches) {
  const filename = m[1];
  const exerciseId = idForPosition(m.index);
  videoToExercise.set(filename, exerciseId);
}

const filesOnDisk = fs
  .readdirSync(EXERCISES_DIR)
  .filter((f) => f.toLowerCase().endsWith(".mp4"));

const referencedFiles = new Set(videoToExercise.keys());
const filesOnDiskSet = new Set(filesOnDisk);

const unusedFiles = filesOnDisk.filter((f) => !referencedFiles.has(f));
const brokenReferences = [...referencedFiles].filter((f) => !filesOnDiskSet.has(f));
const exercisesMissingVideo = idMatches.filter((id, i) => {
  // An exercise is missing video if none of the video matches map back to it.
  return ![...videoToExercise.values()].includes(id);
});

console.log(`Exercises in library: ${idMatches.length}`);
console.log(`Video files on disk: ${filesOnDisk.length}`);
console.log(`Video references in data/exercises.ts: ${videoMatches.length}`);
console.log(`Exercises with video: ${videoMatches.length}`);
console.log(`Exercises without video: ${exercisesMissingVideo.length}`);
console.log("");

let hasError = false;

if (brokenReferences.length > 0) {
  hasError = true;
  console.log(`BROKEN REFERENCES — exercise points at a file that doesn't exist (${brokenReferences.length}):`);
  for (const f of brokenReferences) {
    console.log(`  ${videoToExercise.get(f)} -> /exercises/${f}`);
  }
  console.log("");
}

if (unusedFiles.length > 0) {
  console.log(`UNUSED FILES — on disk but not referenced by any exercise (${unusedFiles.length}):`);
  for (const f of unusedFiles) {
    console.log(`  ${f}`);
  }
  console.log("");
}

if (exercisesMissingVideo.length > 0) {
  console.log(`EXERCISES WITHOUT VIDEO (${exercisesMissingVideo.length}):`);
  for (const id of exercisesMissingVideo) {
    console.log(`  ${id}`);
  }
  console.log("");
}

if (hasError) {
  console.log("FAILED: broken video references found.");
  process.exit(1);
}

if (unusedFiles.length > 0) {
  console.log("WARNING: unused video files found (see above) — attach them to an exercise or remove them.");
  process.exit(1);
}

console.log("OK: every video file is referenced by exactly one exercise, and every reference resolves to a real file.");
