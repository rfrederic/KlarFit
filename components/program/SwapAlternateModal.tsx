"use client";

import { Exercise, Equipment } from "@/lib/types";
import { exercises } from "@/data/exercises";
import { getAlternateSuggestions } from "@/lib/exerciseAlternates";
import Modal from "@/components/ui/Modal";
import Badge from "@/components/ui/Badge";

export default function SwapAlternateModal({
  original,
  currentOverrideSlug,
  availableEquipment,
  onPick,
  onClose,
}: {
  original: Exercise;
  currentOverrideSlug?: string;
  availableEquipment?: Equipment[];
  onPick: (slug: string | undefined) => void;
  onClose: () => void;
}) {
  const suggestions = getAlternateSuggestions(original, exercises, availableEquipment);

  return (
    <Modal title={`Swap "${original.name}"`} onClose={onClose}>
      <div className="flex flex-col gap-3">
        <p className="text-sm text-muted">
          Pick a Week B substitute, or use the auto picked best match. Same muscle sub tag and movement
          pattern, same or easier difficulty.
        </p>

        <button
          type="button"
          onClick={() => {
            onPick(undefined);
            onClose();
          }}
          className={`flex items-center justify-between gap-3 rounded-md border px-4 py-3 text-left transition-colors ${
            !currentOverrideSlug ? "border-accent bg-accent/10" : "border-border bg-background/40 hover:border-accent"
          }`}
        >
          <span className="font-semibold text-foreground">Auto (best match)</span>
          {!currentOverrideSlug && <Badge active>Active</Badge>}
        </button>

        <ul className="flex max-h-72 flex-col gap-2 overflow-y-auto">
          {suggestions.map((candidate) => (
            <li key={candidate.id}>
              <button
                type="button"
                onClick={() => {
                  onPick(candidate.slug);
                  onClose();
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-md border px-4 py-3 text-left transition-colors ${
                  currentOverrideSlug === candidate.slug
                    ? "border-accent bg-accent/10"
                    : "border-border bg-background/40 hover:border-accent"
                }`}
              >
                <span className="font-semibold text-foreground">{candidate.name}</span>
                <span className="flex shrink-0 items-center gap-2">
                  <Badge>{candidate.difficulty}</Badge>
                  {currentOverrideSlug === candidate.slug && <Badge active>Active</Badge>}
                </span>
              </button>
            </li>
          ))}
          {suggestions.length === 0 && (
            <li className="rounded-md border border-border bg-background/40 px-4 py-3 text-sm text-muted">
              No qualifying alternate in the library this exercise stays the same every week.
            </li>
          )}
        </ul>
      </div>
    </Modal>
  );
}
