"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Video from "@/components/ui/Video";

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * True fullscreen overlay for an exercise demo clip. Handles both the 9:16
 * portrait clips (fills the screen, object-cover) and the older 1:1 square
 * clips (letterboxed, object-contain) by measuring the video's own intrinsic
 * dimensions once its metadata loads — no per-exercise config needed.
 */
export default function FullscreenVideoPlayer({ src, onClose }: { src: string; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartY = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [muted, setMuted] = useState(true);
  const [fillScreen, setFillScreen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Ping-pong loop: play forward to the end, then manually scrub the
  // currentTime back down to 0 (native <video> has no reliable reverse
  // playback), then play forward again — a seamless back-and-forth loop
  // instead of a hard jump-cut restart.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let raf = 0;
    let reversing = false;

    const stepBackward = () => {
      if (!reversing) return;
      if (video.currentTime <= 0.05) {
        reversing = false;
        video.currentTime = 0;
        video.play().catch(() => {});
        return;
      }
      video.currentTime = Math.max(0, video.currentTime - 1 / 30);
      raf = requestAnimationFrame(stepBackward);
    };

    const onEnded = () => {
      reversing = true;
      video.pause();
      raf = requestAnimationFrame(stepBackward);
    };

    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("ended", onEnded);
      cancelAnimationFrame(raf);
    };
  }, [src]);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    // Portrait (9:16) clips should fill the screen; square/landscape (1:1)
    // clips letterbox centered so nothing gets stretched or cropped oddly.
    setFillScreen(video.videoHeight > video.videoWidth);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const endY = e.changedTouches[0]?.clientY ?? touchStartY.current;
    if (endY - touchStartY.current > 80) onClose();
    touchStartY.current = null;
  };

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Exercise video"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Video
        ref={videoRef}
        src={src}
        autoPlay
        muted={muted}
        playsInline
        onLoadedMetadata={handleLoadedMetadata}
        className={`h-full w-full ${fillScreen ? "object-cover" : "object-contain"}`}
      />

      <button
        type="button"
        onClick={onClose}
        aria-label="Close video"
        style={{ top: "calc(env(safe-area-inset-top) + 1rem)" }}
        className="absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-black/70 text-white backdrop-blur"
      >
        <XIcon />
      </button>

      <button
        type="button"
        onClick={() => setMuted((v) => !v)}
        style={{ bottom: "calc(env(safe-area-inset-bottom) + 1.25rem)" }}
        className="absolute left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white backdrop-blur"
      >
        {muted ? "Tap to Unmute" : "Mute"}
      </button>
    </div>,
    document.body
  );
}
