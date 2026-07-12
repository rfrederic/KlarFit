"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

/** Re-triggers the fade-slide-in animation on every route change for an app-like transition. */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="animate-fade-slide-in">
      {children}
    </div>
  );
}
