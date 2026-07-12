# KlarFit

A dark, energetic fitness website: a searchable exercise library, a quiz-driven weekly workout
plan generator, and a fully editable "My Program" tracker. Built with Next.js 14 (App Router),
TypeScript, and Tailwind CSS. No backend — everything runs client-side and persists to
`localStorage`.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Also available:

```bash
npm run build   # production build (also runs the TypeScript check)
npm run start   # serve the production build
npm run lint     # ESLint
```

## Project Structure

```
app/                      Routes (App Router)
  page.tsx                Home
  exercises/              Exercise library grid + [slug] detail pages
  my-plan/                Quiz + generated plan
  my-program/             Editable weekly program + checkbox workout mode
  about/, contact/        Static pages
components/
  layout/                 Header, Footer
  ui/                      Button, Badge, Container, SectionHeading, Modal, RotationToggle
  home/                    Hero, HowItWorks, FeaturedExercises
  exercises/               ExerciseCard, ExerciseGrid, ExerciseFilters, ExerciseImage
  quiz/                    QuizContainer, QuizProgressBar, steps/*
  plan/                    WeeklyPlanView, DayCard, DownloadPlanButton
  program/                 DayTabs, ProgramDayView, ProgramSectionCard, ExerciseRow,
                           ExercisePickerModal, SwapAlternateModal, UndoToast
data/
  exercises.ts            Single source of truth for all 228 exercises
  defaultProgram.ts       Seed data for My Program (my personal weekly split)
lib/
  types.ts                Shared TypeScript types
  planGenerator.ts        Rule-based weekly plan generator
  repsRecommendations.ts  Sets/reps/rest recommendations per goal (see below)
  exerciseAlternates.ts   Movement-pattern classifier + alternate-exercise matching + daily cadence
  exerciseRotation.ts     Resolves a program/plan exercise for the active rotation variant (A/B)
  storage.ts              localStorage helpers for quiz answers + plan
  program.ts              localStorage helpers for the editable program + checkbox state
```

## My Program

`/my-program` is a fully editable weekly program, seeded from `data/defaultProgram.ts` and persisted
to `localStorage` (key `userProgram`) as you edit it. Day tabs (Mon–Fri) show one day at a time for
quick use on a phone in the gym. Within a day you can remove exercises (with an undo toast), add an
exercise via a picker modal that searches `data/exercises.ts` or accepts a free-text custom exercise,
edit sets/reps inline, reorder exercises with up/down arrows, and add or remove whole sections.
Exercises that exist in the library link to their detail page; custom entries render as plain text.
A "Checkbox Mode" toggle adds a checkbox to every exercise for ticking off sets while training (state
saved under `userProgram:checks`, with a live completion percentage next to the toggle and a "Clear
Today" button for the active day), and "Reset to Default" restores the original seed program. A
Variant A/Variant B toggle sits above the day's exercises — see "Daily exercise rotation" below for
how exercises rotate every 24 hours and how sets/reps get pre-filled.

## Editing the exercise library

Everything about every exercise — name, muscle groups, equipment, difficulty, instructions,
common mistakes, and image slots — lives in `data/exercises.ts`. Add a new exercise by appending
an object to the `exercises` array; the library grid, detail pages, and plan generator all read
from this one file automatically.

### Muscle groups & sub-tags

`MuscleGroup` (`lib/types.ts`) covers `chest`, `back`, `legs`, `shoulders`, `arms`, `abs`, and
`neck` — all seven show up as filter chips on `/exercises` (`components/exercises/ExerciseFilters.tsx`)
and are searchable in the My Program exercise picker. `neck` is a standalone group; the plan
generator (`lib/planGenerator.ts`) never targets it because none of its `DayTemplate.muscleGroups`
lists `"neck"`, so neck exercises simply never get selected into a generated plan — no special-case
code needed.

### Two-level filters (sub-groups)

Arms, Legs, Back, and Shoulders each have a second-level filter defined in
`lib/subgroups.ts` (`SUBGROUPS_BY_MUSCLE_GROUP`) and shown as a taxonomy:

- Arms → Biceps / Triceps / Forearms
- Legs → Quads / Hamstrings / Glutes / Calves
- Back → Lats / Upper Back / Lower Back / Traps
- Shoulders → Front & Press / Side / Rear / Rotator Cuff

Chest, Abs, and Neck stay flat — there's no natural sub-split for them in the data. On
`/exercises` (`components/exercises/ExerciseFilters.tsx`) and in the My Program picker
(`components/program/ExercisePickerModal.tsx`), tapping a main group chip reveals a horizontally
scrollable row of its sub-chips (mobile-first, `.chip-scroll` in `app/globals.css`); sub-selection
is optional, so the main group alone still shows everything in it. An active-filter count badge
shows next to the "Muscle group" legend.

Exercises carry this via an optional `subGroup?: SubGroup[]` field — an **array**, not a single
value, because some exercises legitimately belong to two taxonomies at once: hinge-pattern leg
exercises (deadlift variations, Cable Pull-Through, Glute-Focused Hyperextension) are tagged
`muscleGroups: ["legs", "back"]` and `subGroup: ["hamstrings", "lowerBack"]` (or `["glutes",
"lowerBack"]`), so they show up correctly under both Legs → Hamstrings/Glutes and Back → Lower
Back. It shows as a badge (labelled via `SUBGROUP_LABELS` in `lib/subgroups.ts`) on the exercise
card and detail page when present; extend the `SubGroup` union in `lib/types.ts` if you add more
categories. A handful of exercises where nothing in the taxonomy fits cleanly (e.g. Hip Adduction
Machine, which targets the inner-thigh adductors, or compound lifts like Push-Up and Pull-Up where
arms/shoulders are only a secondary mover) simply omit `subGroup` rather than force an inaccurate
tag.

The plan generator's `pickExercisesForGroup` only ever checks `exercise.muscleGroups.includes(muscleGroup)`
(never `subGroup`), so these dual-tagged hinge exercises are eligible for either a Legs day or a
Back/Pull day — confirmed with a runtime smoke test across every goal × experience ×
days-per-week combination.

### Essentials

Around 60 classic, beginner-relevant exercises (Push-Up, Barbell Bench Press, Barbell Back Squat,
Deadlift, Pull-Up, Lat Pulldown, Barbell Overhead Press, Lateral Raise, Barbell Curl, Cable Triceps
Pushdown, Forearm Plank, the standard calf raises, and more — spread across every muscle group and
sub-group) are tagged `essential: true` in `data/exercises.ts`. They show an "Essential" badge on
the card, detail page, and My Program picker, and sort first by default on `/exercises` and in the
picker (a sort toggle switches to plain A–Z). `lib/planGenerator.ts`'s `pickExercisesForGroup` adds
an `essentialRank` tiebreaker that only activates for `experience === "beginner"`, so beginner plans
preferentially pick essentials while intermediate/advanced plans are unaffected.

### Male / Female tracks

Every exercise has an `audience: "all" | "male" | "female"` field. `"all"` is the shared
library (216 exercises) and shows up regardless of which track is selected. 12 exercises are tagged
`"female"` as the start of a dedicated female track (general variety across legs, back, chest,
shoulders, arms, and abs — not limited to one muscle group). A future `"male"`-only batch would
follow the same pattern. `/exercises` has an **All / Male / Female** track toggle above the search
box (`components/exercises/ExerciseFilters.tsx`) that filters to `audience === "all"` plus whichever
track is selected; exercises with a non-`"all"` audience show a small track badge on their card and
detail page.

## Tweaking the plan generator

`lib/planGenerator.ts` is organized as a set of lookup tables, not embedded logic, so it's safe to
tune:

- `SPLITS` — which weekly split (Full Body / Upper-Lower / Push-Pull-Legs) is used per days-per-week.
- `EXERCISES_PER_GROUP` — how many exercises per targeted muscle group, by experience level.
- `GOAL_SET_REP_TABLE` — sets/reps/rest per goal (lose fat, build muscle, general fitness).
- `setsForExperience()` — how experience level scales the base set count.
- `DIFFICULTY_PREFERENCE` — which difficulty tier is favored first per experience level.

The generator filters out any exercise whose `contraindications` match a limitation the user
selected in the quiz (knees, lower back, shoulders), and never repeats the same exercise twice
within a single day.

## Sets & reps recommendations

`lib/repsRecommendations.ts` is a second, independent rule-table system (no AI/network calls) that
answers "how many sets/reps/rest for this exercise?" for three training goals — Strength, Muscle
Growth, and Endurance/Toning:

- Every exercise is classified as `"compound"` (squats, deadlifts, presses, rows, pull-ups —
  lower rep end, longer rest), `"isolation"` (curls, raises, extensions, calf/forearm work —
  higher rep end, shorter rest), or `"timeBased"` (planks, wall sit, dead hang, farmer's carry —
  a duration range instead of reps). `classifyExerciseType()` does this with a small keyword match
  on the exercise name plus a few explicit overrides (e.g. calf/forearm sub-tags always count as
  isolation, even for a machine named "45-Degree **Leg Press** Calf Raise").
- `getRecommendation(exercise, goal, experience)` looks up `REP_TABLE`/`TIME_BASED_TABLE` for that
  goal × type, then shaves one set off for `experience === "beginner"` (floor of 2) — the same rule
  `lib/planGenerator.ts` already uses.
- `GOAL_TO_TRAINING_GOAL` maps the quiz's three goals (`generalFitness` → Strength, `buildMuscle` →
  Muscle Growth, `loseFat` → Endurance/Toning) onto the three training-goal columns.

Every exercise detail page shows a "Recommended Sets & Reps" card (`components/exercises/RecommendationCard.tsx`)
with all three goals side by side; if the visitor has saved quiz answers, their goal's column is
highlighted in lime. The My Program exercise picker (`app/my-program/MyProgramClient.tsx`) uses the
same function to pre-fill sets/reps for the user's own goal instead of a generic "3 × 10" default.

## Daily exercise rotation

Both My Plan and My Program alternate exercises every 24 hours so training doesn't go stale. Three
files drive it:

- `lib/exerciseAlternates.ts` classifies every exercise into a `MovementPattern` (e.g.
  `horizontalPush` for bench-press-family lifts vs. `verticalPush` for overhead presses — both can
  share the `frontPress` sub-tag, so the pattern check is what keeps a press from ever being swapped
  for a fly, or a squat for a hinge). `getBestAlternate()`/`getAlternateSuggestions()` then filter the
  library to exercises that share that movement pattern **and** a muscle sub-tag, are the same
  difficulty or easier, and (when the user's quiz equipment is known) prefer equipment they actually
  have — ties break alphabetically by id, so the same exercise always resolves to the same swap,
  never a random one. If nothing qualifies, the exercise simply stays the same on both variants.
- `getCurrentRotationVariant()` derives "Variant A" vs. "Variant B" from the local calendar day
  (even day number = A, odd = B) — no extra state to store, it flips once every 24 hours purely as a
  function of today's date. `components/ui/RotationToggle.tsx` shows which variant is active today
  and has a manual button to preview the other one without changing what's actually "today".
- `lib/exerciseRotation.ts` ties it together per exercise, for both pages:
  - `resolveProgramExercise()` (My Program): Variant A always shows the user's base exercise; Variant
    B shows the auto-picked (or manually overridden) alternate unless the exercise is locked.
  - `resolvePlanExercise()` (My Plan): same rules applied to the quiz-generated plan's exercises at
    render time — the saved plan itself is never mutated, so retaking the quiz doesn't interact with
    rotation at all, and there's no lock/manual-override concept since the plan isn't per-exercise
    editable.
  - Both re-derive reps via `repsRecommendations.getRecommendation()` only when a swap crosses the
    rep-based/time-based line (e.g. Lat Pulldown ↔ Dead Hang), so "10 reps" doesn't show up on a
    hold — `DayCard` also swaps the unit label itself ("reps" vs. "hold") to match.

Each exercise row in My Program has a lock icon (pins it so it never rotates) and a swap icon (pick
a specific alternate from the same suggestion list instead of the auto-picked one). Both are stored
per-exercise as `locked`/`weekBOverrideSlug` on `ProgramExercise` (`lib/types.ts`), alongside the
existing sets/reps, so they persist with the rest of the program. Checkbox-mode ticks are still
keyed by the exercise's stable `id` (not its slug), so ticking off sets works correctly regardless
of which variant is on screen. My Plan has no per-exercise persistence, so it only shows the toggle
and the auto-picked alternate — no lock/swap controls.

### Checklist completion percentage

When "Checkbox Mode" is on in My Program, a live percentage (plus a progress bar and "x/y" count)
shows next to the toggle, computed from the active day's exercises and its saved checks
(`app/my-program/MyProgramClient.tsx`). It recalculates on every check/uncheck and stays correct
after adding, removing, or resetting exercises since it's derived from the current day tree rather
than stored separately.

## Swapping in real images

Ready-to-use AI image generation prompts for all 456 images (Midjourney/DALL-E/Stable Diffusion/Flux,
with a consistency strategy for keeping the same model across every shot) are in
[`EXERCISE_IMAGE_PROMPTS.md`](./EXERCISE_IMAGE_PROMPTS.md). Motion prompts for short looping demo
clips (Kling image-to-video/text-to-video) are in [`KLING_VIDEO_PROMPTS.md`](./KLING_VIDEO_PROMPTS.md) —
currently covering the 38-exercise Abs Expansion, 26-exercise Biceps Expansion, 20-exercise
Traps / Neck / Calves Expansion, 25-exercise Triceps Expansion, 7-exercise Forearms Expansion, and
34-exercise Legs Expansion batches (150 clips total), filename convention `{slug}.mp4` dropped into
`public/exercises/` and wired via each exercise's optional `video` field in `data/exercises.ts` (see
`components/exercises/ExerciseCard.tsx` for the lazy-loaded autoplay thumbnail and
`app/exercises/[slug]/page.tsx` for the 16:9 detail-page player).

Every exercise has an `imageStart` and `imageEnd` field:

```ts
imageStart: { src: "/placeholders/push-up-start.svg", alt: "Push-up starting position in a high plank" },
imageEnd:   { src: "/placeholders/push-up-end.svg",   alt: "Push-up bottom position with chest near the floor" },
```

Right now `components/exercises/ExerciseImage.tsx` ignores `src` and renders a styled placeholder
div instead of an `<img>`, so the layout is correct today with zero real image files. To swap in
AI-generated photos:

1. Generate the images (list and dimensions below) and drop them in `public/exercises/`.
2. Update each exercise's `imageStart.src` / `imageEnd.src` in `data/exercises.ts` to point at the
   new files (e.g. `/exercises/push-up-start.jpg`), keeping the existing `alt` text or improving it.
3. In `components/exercises/ExerciseImage.tsx`, replace the placeholder `<div>` with:
   ```tsx
   import Image from "next/image";
   <Image src={image.src} alt={image.alt} fill className="object-cover rounded-lg" />
   ```

### Image files to generate

456 images total (228 exercises × start/end). Recommended: **1024×1024px, square, JPG or WebP**,
consistent lighting/background across the set so the library feels cohesive. Filenames should
match the pattern `{slug}-start` / `{slug}-end`:

- push-up-start / push-up-end
- barbell-bench-press-start / barbell-bench-press-end
- dumbbell-bench-press-start / dumbbell-bench-press-end
- incline-dumbbell-press-start / incline-dumbbell-press-end
- dumbbell-chest-fly-start / dumbbell-chest-fly-end
- machine-chest-press-start / machine-chest-press-end
- pull-up-start / pull-up-end
- lat-pulldown-start / lat-pulldown-end
- bent-over-barbell-row-start / bent-over-barbell-row-end
- dumbbell-row-start / dumbbell-row-end
- seated-cable-row-start / seated-cable-row-end
- band-pull-apart-start / band-pull-apart-end
- deadlift-start / deadlift-end
- bodyweight-squat-start / bodyweight-squat-end
- barbell-back-squat-start / barbell-back-squat-end
- dumbbell-goblet-squat-start / dumbbell-goblet-squat-end
- walking-lunge-start / walking-lunge-end
- bodyweight-lunge-start / bodyweight-lunge-end
- leg-press-start / leg-press-end
- leg-curl-machine-start / leg-curl-machine-end
- leg-extension-machine-start / leg-extension-machine-end
- glute-bridge-start / glute-bridge-end
- romanian-deadlift-start / romanian-deadlift-end
- standing-calf-raise-start / standing-calf-raise-end
- barbell-overhead-press-start / barbell-overhead-press-end
- dumbbell-shoulder-press-start / dumbbell-shoulder-press-end
- lateral-raise-start / lateral-raise-end
- front-raise-start / front-raise-end
- band-shoulder-press-start / band-shoulder-press-end
- rear-delt-fly-start / rear-delt-fly-end
- dumbbell-bicep-curl-start / dumbbell-bicep-curl-end
- barbell-curl-start / barbell-curl-end
- hammer-curl-start / hammer-curl-end
- band-bicep-curl-start / band-bicep-curl-end
- triceps-dip-start / triceps-dip-end
- cable-triceps-pushdown-start / cable-triceps-pushdown-end
- overhead-triceps-extension-start / overhead-triceps-extension-end
- plank-start / plank-end
- bicycle-crunch-start / bicycle-crunch-end
- russian-twist-start / russian-twist-end
- hanging-leg-raise-start / hanging-leg-raise-end
- band-pallof-press-start / band-pallof-press-end
- mountain-climbers-start / mountain-climbers-end
- close-grip-dumbbell-press-start / close-grip-dumbbell-press-end
- cable-fly-start / cable-fly-end
- t-bar-row-start / t-bar-row-end
- dead-hang-start / dead-hang-end
- seated-calf-raise-start / seated-calf-raise-end
- wall-sit-start / wall-sit-end
- kettlebell-swing-start / kettlebell-swing-end
- cable-lateral-raise-start / cable-lateral-raise-end
- arnold-press-start / arnold-press-end
- upright-row-start / upright-row-end
- cable-curl-start / cable-curl-end
- wrist-curl-start / wrist-curl-end
- reverse-curl-start / reverse-curl-end
- skull-crushers-start / skull-crushers-end
- farmers-carry-start / farmers-carry-end
- cable-crunch-start / cable-crunch-end
- decline-sit-up-start / decline-sit-up-end
- cable-woodchopper-start / cable-woodchopper-end
- ab-wheel-rollout-start / ab-wheel-rollout-end
- dead-bug-start / dead-bug-end
- weighted-plank-start / weighted-plank-end
- reverse-crunch-start / reverse-crunch-end
- side-plank-start / side-plank-end
- hip-thrust-start / hip-thrust-end
- cable-kickback-start / cable-kickback-end
- dumbbell-sumo-squat-start / dumbbell-sumo-squat-end
- band-lateral-walk-start / band-lateral-walk-end
- incline-push-up-start / incline-push-up-end
- renegade-row-start / renegade-row-end
- cable-face-pull-start / cable-face-pull-end
- dumbbell-step-up-start / dumbbell-step-up-end
- superman-start / superman-end
- band-row-start / band-row-end
- concentration-curl-start / concentration-curl-end
- v-up-start / v-up-end
- ab-crunch-start / ab-crunch-end
- sit-up-start / sit-up-end
- hands-overhead-ab-crunch-start / hands-overhead-ab-crunch-end
- floor-crunch-legs-on-bench-start / floor-crunch-legs-on-bench-end
- lying-floor-leg-raise-start / lying-floor-leg-raise-end
- lying-alternate-floor-leg-raise-start / lying-alternate-floor-leg-raise-end
- alternate-straight-leg-lowering-start / alternate-straight-leg-lowering-end
- lying-leg-raise-hip-thrust-start / lying-leg-raise-hip-thrust-end
- lying-knee-tuck-to-heel-raise-start / lying-knee-tuck-to-heel-raise-end
- lying-alternate-heel-touches-start / lying-alternate-heel-touches-end
- straight-leg-toe-touch-start / straight-leg-toe-touch-end
- weighted-straight-leg-toe-touch-start / weighted-straight-leg-toe-touch-end
- weighted-side-touches-start / weighted-side-touches-end
- reach-and-catch-start / reach-and-catch-end
- hollow-body-hold-start / hollow-body-hold-end
- dragon-flag-start / dragon-flag-end
- seated-leg-tucks-start / seated-leg-tucks-end
- abdominal-pendulum-start / abdominal-pendulum-end
- hanging-knee-raise-start / hanging-knee-raise-end
- twisting-hanging-knee-raise-start / twisting-hanging-knee-raise-end
- weighted-hanging-knee-raise-start / weighted-hanging-knee-raise-end
- roman-chair-knee-raise-start / roman-chair-knee-raise-end
- weighted-chair-knee-raise-start / weighted-chair-knee-raise-end
- chair-leg-raise-start / chair-leg-raise-end
- decline-bench-knee-raise-start / decline-bench-knee-raise-end
- decline-bench-leg-raise-start / decline-bench-leg-raise-end
- decline-leg-raise-hip-thrust-start / decline-leg-raise-hip-thrust-end
- decline-abdominal-reach-start / decline-abdominal-reach-end
- decline-weighted-abdominal-reach-start / decline-weighted-abdominal-reach-end
- decline-weighted-twist-start / decline-weighted-twist-end
- twisting-decline-sit-up-start / twisting-decline-sit-up-end
- decline-cable-knee-raise-start / decline-cable-knee-raise-end
- standing-cable-crunch-start / standing-cable-crunch-end
- twisting-cable-crunch-start / twisting-cable-crunch-end
- abdominal-barbell-rollout-start / abdominal-barbell-rollout-end
- standing-barbell-twist-start / standing-barbell-twist-end
- ball-crunch-start / ball-crunch-end
- exercise-ball-leg-tuck-start / exercise-ball-leg-tuck-end
- seated-dumbbell-curl-start / seated-dumbbell-curl-end
- seated-hammer-curl-start / seated-hammer-curl-end
- incline-dumbbell-curl-start / incline-dumbbell-curl-end
- incline-hammer-curl-start / incline-hammer-curl-end
- spider-curl-start / spider-curl-end
- zottman-curl-start / zottman-curl-end
- standing-dumbbell-drag-curl-start / standing-dumbbell-drag-curl-end
- standing-dumbbell-reverse-curl-start / standing-dumbbell-reverse-curl-end
- standing-concentration-curl-start / standing-concentration-curl-end
- pinwheel-curl-start / pinwheel-curl-end
- lying-wide-dumbbell-curl-start / lying-wide-dumbbell-curl-end
- seated-barbell-curl-start / seated-barbell-curl-end
- close-grip-barbell-curl-start / close-grip-barbell-curl-end
- ez-bar-curl-start / ez-bar-curl-end
- close-grip-ez-bar-curl-start / close-grip-ez-bar-curl-end
- ez-bar-preacher-curl-start / ez-bar-preacher-curl-end
- ez-bar-preacher-reverse-curl-start / ez-bar-preacher-reverse-curl-end
- dumbbell-preacher-curl-start / dumbbell-preacher-curl-end
- dumbbell-hammer-preacher-curl-start / dumbbell-hammer-preacher-curl-end
- machine-preacher-curl-start / machine-preacher-curl-end
- cable-preacher-curl-start / cable-preacher-curl-end
- standing-one-arm-cable-curl-start / standing-one-arm-cable-curl-end
- rope-cable-curl-start / rope-cable-curl-end
- reverse-cable-curl-start / reverse-cable-curl-end
- high-cable-curl-start / high-cable-curl-end
- lying-cable-curl-start / lying-cable-curl-end
- behind-the-back-barbell-shrug-start / behind-the-back-barbell-shrug-end
- cable-shrug-start / cable-shrug-end
- gittleson-shrug-start / gittleson-shrug-end
- seated-dumbbell-shrug-start / seated-dumbbell-shrug-end
- smith-machine-shrug-start / smith-machine-shrug-end
- isometric-neck-exercise-front-start / isometric-neck-exercise-front-end
- isometric-neck-exercise-back-start / isometric-neck-exercise-back-end
- isometric-neck-exercise-side-start / isometric-neck-exercise-side-end
- lying-face-up-plate-neck-resistance-start / lying-face-up-plate-neck-resistance-end
- lying-face-down-plate-neck-resistance-start / lying-face-down-plate-neck-resistance-end
- neck-bridge-prone-start / neck-bridge-prone-end
- donkey-calf-raise-start / donkey-calf-raise-end
- standing-dumbbell-calf-raise-start / standing-dumbbell-calf-raise-end
- standing-barbell-calf-raise-start / standing-barbell-calf-raise-end
- standing-one-leg-dumbbell-calf-raise-start / standing-one-leg-dumbbell-calf-raise-end
- standing-smith-machine-calf-raise-start / standing-smith-machine-calf-raise-end
- seated-dumbbell-calf-raise-start / seated-dumbbell-calf-raise-end
- seated-smith-machine-calf-raise-start / seated-smith-machine-calf-raise-end
- 45-degree-leg-press-calf-raise-start / 45-degree-leg-press-calf-raise-end
- rope-jumping-start / rope-jumping-end
- triceps-dips-start / triceps-dips-end
- weighted-triceps-dips-start / weighted-triceps-dips-end
- close-grip-push-up-start / close-grip-push-up-end
- body-triceps-press-start / body-triceps-press-end
- close-grip-bench-press-start / close-grip-bench-press-end
- smith-machine-reverse-close-grip-bench-press-start / smith-machine-reverse-close-grip-bench-press-end
- dumbbell-triceps-kickback-start / dumbbell-triceps-kickback-end
- one-arm-dumbbell-overhead-extension-start / one-arm-dumbbell-overhead-extension-end
- lying-dumbbell-triceps-extension-start / lying-dumbbell-triceps-extension-end
- incline-dumbbell-triceps-extension-start / incline-dumbbell-triceps-extension-end
- dumbbell-tate-press-start / dumbbell-tate-press-end
- ez-bar-skullcrusher-start / ez-bar-skullcrusher-end
- reverse-grip-skullcrusher-start / reverse-grip-skullcrusher-end
- california-skullcrusher-start / california-skullcrusher-end
- overhead-ez-bar-triceps-extension-start / overhead-ez-bar-triceps-extension-end
- overhead-cable-triceps-extension-start / overhead-cable-triceps-extension-end
- one-arm-standing-overhead-cable-extension-start / one-arm-standing-overhead-cable-extension-end
- one-arm-cable-triceps-extension-start / one-arm-cable-triceps-extension-end
- reverse-grip-cable-pushdown-start / reverse-grip-cable-pushdown-end
- incline-cable-triceps-extension-start / incline-cable-triceps-extension-end
- cable-lying-triceps-extension-start / cable-lying-triceps-extension-end
- low-cable-triceps-extension-start / low-cable-triceps-extension-end
- kneeling-cable-triceps-extension-over-flat-bench-start / kneeling-cable-triceps-extension-over-flat-bench-end
- cable-concentration-triceps-extension-start / cable-concentration-triceps-extension-end
- cable-triceps-kickback-start / cable-triceps-kickback-end
- reverse-dumbbell-wrist-curl-start / reverse-dumbbell-wrist-curl-end
- neutral-grip-dumbbell-wrist-curl-start / neutral-grip-dumbbell-wrist-curl-end
- reverse-barbell-wrist-curl-start / reverse-barbell-wrist-curl-end
- behind-the-back-barbell-wrist-curl-start / behind-the-back-barbell-wrist-curl-end
- seated-cable-reverse-wrist-curl-start / seated-cable-reverse-wrist-curl-end
- single-arm-cable-wrist-curl-palms-up-start / single-arm-cable-wrist-curl-palms-up-end
- single-arm-cable-wrist-curl-palms-down-start / single-arm-cable-wrist-curl-palms-down-end
- barbell-front-squat-start / barbell-front-squat-end
- barbell-box-squat-start / barbell-box-squat-end
- barbell-hack-squat-start / barbell-hack-squat-end
- dumbbell-bulgarian-split-squat-start / dumbbell-bulgarian-split-squat-end
- double-kettlebell-front-squat-start / double-kettlebell-front-squat-end
- landmine-goblet-squat-start / landmine-goblet-squat-end
- kneeling-squat-start / kneeling-squat-end
- smith-machine-squat-start / smith-machine-squat-end
- smith-machine-front-squat-start / smith-machine-front-squat-end
- barbell-lunge-start / barbell-lunge-end
- barbell-walking-lunge-start / barbell-walking-lunge-end
- dumbbell-lunge-start / dumbbell-lunge-end
- smith-machine-lunge-start / smith-machine-lunge-end
- landmine-reverse-lunge-start / landmine-reverse-lunge-end
- barbell-step-up-start / barbell-step-up-end
- barbell-stiff-leg-deadlift-start / barbell-stiff-leg-deadlift-end
- dumbbell-stiff-leg-deadlift-start / dumbbell-stiff-leg-deadlift-end
- smith-machine-stiff-leg-deadlift-start / smith-machine-stiff-leg-deadlift-end
- barbell-sumo-romanian-deadlift-start / barbell-sumo-romanian-deadlift-end
- kettlebell-sumo-deadlift-start / kettlebell-sumo-deadlift-end
- single-leg-barbell-deadlift-start / single-leg-barbell-deadlift-end
- banded-deadlift-start / banded-deadlift-end
- jefferson-deadlift-start / jefferson-deadlift-end
- standing-leg-curl-start / standing-leg-curl-end
- standing-cable-hamstring-curl-start / standing-cable-hamstring-curl-end
- lying-cable-hamstring-curl-start / lying-cable-hamstring-curl-end
- dumbbell-hamstring-curl-start / dumbbell-hamstring-curl-end
- cable-pull-through-start / cable-pull-through-end
- single-leg-dumbbell-hip-thrust-start / single-leg-dumbbell-hip-thrust-end
- glute-focused-hyperextension-start / glute-focused-hyperextension-end
- hip-abduction-machine-start / hip-abduction-machine-end
- hip-adduction-machine-start / hip-adduction-machine-end
- single-leg-45-degree-leg-press-start / single-leg-45-degree-leg-press-end
- smith-machine-leg-press-start / smith-machine-leg-press-end

### Video files to generate (optional)

150 Kling motion prompts for the Abs Expansion, Biceps Expansion, Traps / Neck / Calves Expansion,
Triceps Expansion, Forearms Expansion, and Legs Expansion batches are in
[`KLING_VIDEO_PROMPTS.md`](./KLING_VIDEO_PROMPTS.md), filename convention `{slug}.mp4` (the
isometric neck holds are filmed as a sustained hold rather than a rep cycle, and the Forearms
Expansion clips are small movements where only the wrists move — see the notes in that file).
These are optional — exercises without a video fall back to the `imageStart`/`imageEnd`
placeholders.

Each exercise's exact `alt` text (already written for accessibility) is in `data/exercises.ts` and
doubles as a solid image-generation prompt starting point.

## Notes

- No backend/database: quiz answers and the generated plan are stored in the browser's
  `localStorage` (`lib/storage.ts`) and persist across refreshes.
- "Download my plan" uses the browser's native print dialog with a dedicated print stylesheet
  (`app/globals.css`, `@media print`) that hides site chrome and prints the plan cleanly.
