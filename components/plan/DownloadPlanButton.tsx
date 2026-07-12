"use client";

import { Button } from "@/components/ui/Button";

export default function DownloadPlanButton() {
  return (
    <Button variant="secondary" className="no-print" onClick={() => window.print()}>
      Download My Plan
    </Button>
  );
}
