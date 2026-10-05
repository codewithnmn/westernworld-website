"use client";

import { useState } from "react";
import { PostCard } from "@/components/news";
import type { Post } from "@/content/posts";

const FILTERS = ["All", "News", "Blog"] as const;

/** /blog listing with All / News / Blog tabs (filtered in the browser so the page stays static). */
export default function PostList({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const shown = filter === "All" ? posts : posts.filter((p) => p.kind === filter);
  return (
    <>
      <div role="tablist" aria-label="Filter posts" className="mb-8 inline-flex rounded-full border border-line bg-white p-1">
        {FILTERS.map((f) => (
          <button key={f} role="tab" aria-selected={filter === f} onClick={() => setFilter(f)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition ${filter === f ? "bg-ink text-white" : "text-slate-600 hover:text-ink"}`}>
            {f}
            <span className={`ml-1.5 font-mono text-[11px] ${filter === f ? "text-sun" : "text-slate-400"}`}>
              {f === "All" ? posts.length : posts.filter((p) => p.kind === f).length}
            </span>
          </button>
        ))}
      </div>
      {shown.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => <PostCard key={p.slug} p={p} />)}
        </div>
      ) : (
        <p className="rounded-xl border-2 border-dashed border-line p-10 text-center text-slate-500">Nothing here yet. Check back soon.</p>
      )}
    </>
  );
}
