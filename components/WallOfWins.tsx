"use client";

import { useState } from "react";
import PhotoWall from "@/components/PhotoWall";
import { SCORECARDS, VISA_WINS } from "@/content/testimonials";

const TABS = [
  { id: "visas", label: "Visas in hand", images: VISA_WINS, fit: "cover" as const, alt: "Western World student receiving their visa", badge: "Visa in hand" },
  { id: "scores", label: "IELTS scorecards", images: SCORECARDS, fit: "contain" as const, alt: "Western World student's IELTS scorecard", badge: undefined },
];

/**
 * Testimonials from the old site: visa handover photos and IELTS scorecards, in two tabs.
 * `feature` = home-page mosaic (first visa photo large, "Visa in hand" badges); `light` = on a white section.
 */
export default function WallOfWins({ limit, feature = false, light = false }: { limit?: number; feature?: boolean; light?: boolean }) {
  const [tab, setTab] = useState(TABS[0].id);
  const current = TABS.find((t) => t.id === tab)!;
  return (
    <div>
      <div role="tablist" aria-label="Success stories" className={`mb-8 inline-flex rounded-full p-1 ${light ? "bg-brand-light" : "bg-white/10"}`}>
        {TABS.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${tab === t.id ? (light ? "bg-brand text-white" : "bg-white text-ink") : light ? "text-brand/70 hover:text-brand" : "text-white/70 hover:text-white"}`}>
            {t.label}
            <span className={`font-mono text-[11px] ${tab === t.id ? (light ? "text-sun" : "text-accent") : light ? "text-brand/40" : "text-white/40"}`}>{t.images.length}</span>
          </button>
        ))}
      </div>
      <div role="tabpanel">
        <PhotoWall key={current.id} images={current.images} alt={current.alt} fit={current.fit} limit={limit} dark={!light}
                   feature={feature && current.fit === "cover"} badge={feature ? current.badge : undefined} />
      </div>
    </div>
  );
}
