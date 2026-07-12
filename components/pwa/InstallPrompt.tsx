"use client";

import { useEffect, useState } from "react";

const DISMISSED_KEY = "klarfit:install-dismissed";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function isIosSafari() {
  const ua = window.navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (ua.includes("Macintosh") && "ontouchend" in document);
  const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|OPiOS|EdgiOS/.test(ua);
  return isIOS && isSafari;
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIosHint, setShowIosHint] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const wasDismissed = window.localStorage.getItem(DISMISSED_KEY) === "1";
    setDismissed(wasDismissed);

    if (isStandalone()) return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    if (!wasDismissed && isIosSafari()) {
      setShowIosHint(true);
    }

    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  const handleDismiss = () => {
    window.localStorage.setItem(DISMISSED_KEY, "1");
    setDismissed(true);
    setDeferredPrompt(null);
    setShowIosHint(false);
  };

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    handleDismiss();
  };

  if (dismissed || (!deferredPrompt && !showIosHint)) return null;

  return (
    <div className="fixed inset-x-4 bottom-20 z-40 mx-auto flex max-w-md items-center justify-between gap-4 rounded-lg border border-accent bg-surface-raised px-4 py-3 shadow-glow md:bottom-4 md:right-6 md:left-auto md:inset-x-auto">
      {deferredPrompt ? (
        <>
          <span className="text-sm text-foreground">Install KlarFit for quick, offline access.</span>
          <div className="flex shrink-0 items-center gap-4">
            <button type="button" onClick={handleDismiss} className="text-sm text-muted hover:text-foreground">
              Not now
            </button>
            <button
              type="button"
              onClick={handleInstall}
              className="font-display text-sm uppercase tracking-wide text-accent hover:underline"
            >
              Install
            </button>
          </div>
        </>
      ) : (
        <>
          <span className="text-sm text-foreground">
            Install KlarFit: tap <strong>Share</strong>, then <strong>Add to Home Screen</strong>.
          </span>
          <button
            type="button"
            onClick={handleDismiss}
            className="shrink-0 text-sm font-semibold text-accent hover:underline"
          >
            Got it
          </button>
        </>
      )}
    </div>
  );
}
