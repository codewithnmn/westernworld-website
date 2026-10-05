"use client";

import { useState } from "react";
import PhotoWall from "@/components/PhotoWall";
import { SCORECARDS, VISA_WINS } from "@/content/testimonials";

const TABS = [
  { id: "visas", label: "Visas in hand", images: VISA_WINS, fit: "cover" as const, alt: "Western World student receiving their visa" },
  { id: "scores", label: "IELTS scorecards", images: SCORECARDS, fit: "contain" as const, alt: "Western World student's IELTS scorecard" },
];

/** Testimonials from the old site: visa handover photos and IELTS scorecards, in two tabs. */
export default function WallOfWins({ limit }: { limit?: number }) {
  const [tab, setTab] = useState(TABS[0].id);
  const current = TABS.find((t) => t.id === tab)!;
  return (
    <div>
      <div role="tablist" aria-label="Success stories" className="mb-8 inline-flex rounded-full bg-white/10 p-1">
        {TABS.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${tab === t.id ? "bg-white text-ink" : "text-white/70 hover:text-white"}`}>
            {t.label}
            <span className={`font-mono text-[11px] ${tab === t.id ? "text-accent" : "text-white/40"}`}>{t.images.length}</span>
          </button>
        ))}
      </div>
      <div role="tabpanel">
        <PhotoWall key={current.id} images={current.images} alt={current.alt} fit={current.fit} limit={limit} dark />
      </div>
    </div>
  );
}
