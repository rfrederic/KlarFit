"use client";

export default function UndoToast({ message, onUndo }: { message: string; onUndo: () => void }) {
  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-md items-center justify-between gap-4 rounded-lg border border-accent bg-surface-raised px-4 py-3 shadow-glow sm:inset-x-auto sm:right-6">
      <span className="text-sm text-foreground">{message}</span>
      <button
        type="button"
        onClick={onUndo}
        className="shrink-0 font-display text-sm uppercase tracking-wide text-accent hover:underline"
      >
        Undo
      </button>
    </div>
  );
}
