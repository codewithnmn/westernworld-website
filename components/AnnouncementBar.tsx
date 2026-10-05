"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { ArrowRight, X } from "lucide-react";
import { ANNOUNCEMENT as A } from "@/content/announcement";

const DAY = 86_400_000;
const storageKey = `ww-announcement-closed:${A.id}`;
const noSubscribe = () => () => {};

/** Whole days until the end of the deadline day (in the visitor's time zone); negative once it has passed. */
function daysLeft(deadline: string) {
  const end = new Date(`${deadline}T23:59:59`);
  return Math.floor((end.getTime() - Date.now()) / DAY);
}

function wasClosed() {
  try {
    return localStorage.getItem(storageKey) === "1";
  } catch {
    return false;
  }
}

/**
 * Site-wide announcement (content/announcement.ts). Pages are pre-rendered, so the countdown and the "closed" state are
 * read in the browser: the server renders the fixed date, the browser swaps in "N days remaining".
 */
export default function AnnouncementBar() {
  const [closedNow, setClosedNow] = useState(false);
  const closedBefore = useSyncExternalStore(noSubscribe, wasClosed, () => false);
  const days = useSyncExternalStore(noSubscribe, () => (A.deadline ? daysLeft(A.deadline) : null), () => null);

  if (!A.enabled || closedNow || closedBefore || (days !== null && days < 0)) return null;

  const countdown = days !== null
    ? days === 0 ? "Last day today" : `${days} day${days === 1 ? "" : "s"} remaining`
    : A.deadline
      ? `Closes ${new Date(`${A.deadline}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`
      : null;

  const close = () => {
    try {
      localStorage.setItem(storageKey, "1");
    } catch {
      // Private mode: the bar still closes for this page view.
    }
    setClosedNow(true);
  };

  return (
    <div role="region" aria-label="Announcement" className="relative border-b border-white/10 bg-[#081633] text-white">
      <Link href={A.href}
            className="group mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-0.5 px-10 py-2.5 text-sm focus-visible:outline-sun">
        <span className="relative flex size-2.5 shrink-0" aria-hidden>
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-sun opacity-60" />
          <span className="relative inline-flex size-2.5 rounded-full bg-sun ring-2 ring-sun/25" />
        </span>
        <span className="font-semibold">{A.message}</span>
        {countdown && (
          <>
            <span className="hidden h-3.5 w-px bg-white/25 sm:block" aria-hidden />
            <span className="font-semibold text-sun">{countdown}</span>
          </>
        )}
        <span className="inline-flex items-center gap-1 font-semibold text-sun underline decoration-sun/50 underline-offset-4 group-hover:decoration-sun">
          {A.cta} <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
        </span>
      </Link>
      <button onClick={close} aria-label="Close announcement"
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-1.5 text-white/50 transition hover:bg-white/10 hover:text-white">
        <X className="size-4" />
      </button>
    </div>
  );
}
