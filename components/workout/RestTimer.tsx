"use client";

import { useEffect, useRef, useState } from "react";

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

/** Short, self-contained beep via the Web Audio API — no audio asset needed. */
function playBeep() {
  try {
    const AudioContextCtor =
      window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) return;
    const ctx = new AudioContextCtor();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.frequency.value = 880;
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.4);
  } catch {
    // Web Audio unavailable — vibration (if supported) is still enough feedback.
  }
}

/** Counts down from `seconds`, restarting whenever `seconds` changes (pass a
 * changing `key` from the parent, e.g. the logged-set count, to force a clean
 * restart each time a new set is logged). Vibrates + beeps once at zero. */
export default function RestTimer({ seconds, onComplete }: { seconds: number; onComplete?: () => void }) {
  const [remaining, setRemaining] = useState(seconds);
  const firedRef = useRef(false);

  useEffect(() => {
    setRemaining(seconds);
    firedRef.current = false;
  }, [seconds]);

  useEffect(() => {
    if (remaining <= 0) {
      if (!firedRef.current) {
        firedRef.current = true;
        if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate([120, 60, 120]);
        playBeep();
        onComplete?.();
      }
      return;
    }
    const timeout = window.setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => window.clearTimeout(timeout);
  }, [remaining, onComplete]);

  const percent = seconds > 0 ? Math.max(0, Math.min(100, (remaining / seconds) * 100)) : 0;

  return (
    <div className="rounded-lg border border-border bg-surface p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted">Rest Timer</span>
        <span className="font-display text-xl text-accent">{formatTime(Math.max(0, remaining))}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-background">
        <div className="h-full rounded-full bg-accent transition-all duration-1000 ease-linear" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
