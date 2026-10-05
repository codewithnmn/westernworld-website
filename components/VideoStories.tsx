"use client";

import Image from "next/image";
import { useState } from "react";
import { Play, Video } from "lucide-react";
import { VIDEO_STORIES, type VideoStory } from "@/content/testimonials";

/**
 * Video testimonials. A published video shows its thumbnail and only loads YouTube (privacy-enhanced mode) when
 * played, so the page stays fast; an empty slot shows a "coming soon" frame.
 */
export default function VideoStories() {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {VIDEO_STORIES.map((v, i) => <li key={v.youtubeId ?? i}><VideoCard story={v} /></li>)}
    </ul>
  );
}

function VideoCard({ story }: { story: VideoStory }) {
  const [playing, setPlaying] = useState(false);
  const id = story.youtubeId;

  return (
    <figure>
      <div className="relative aspect-video overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10">
        {id && playing ? (
          <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={story.name ?? "Student story"}
                  allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen className="absolute inset-0 size-full" />
        ) : id ? (
          <button onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label={`Play ${story.name ?? "student story"}`}>
            <Image src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            <span className="absolute inset-0 bg-ink/30 transition group-hover:bg-ink/10" />
            <span className="absolute top-1/2 left-1/2 flex size-16 -translate-1/2 items-center justify-center rounded-full bg-accent text-white shadow-xl transition group-hover:scale-110">
              <Play className="ml-1 size-6 fill-current" />
            </span>
          </button>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-white/15 text-white/40">
            {/* Film-strip edges */}
            <span className="absolute inset-x-0 top-2 h-2 bg-[repeating-linear-gradient(90deg,rgb(255_255_255/0.12)_0_10px,transparent_10px_20px)]" aria-hidden />
            <span className="absolute inset-x-0 bottom-2 h-2 bg-[repeating-linear-gradient(90deg,rgb(255_255_255/0.12)_0_10px,transparent_10px_20px)]" aria-hidden />
            <Video className="size-8" />
            <span className="tag">Video story · coming soon</span>
          </div>
        )}
      </div>
      {(story.name || story.detail) && (
        <figcaption className="mt-3">
          {story.name && <p className="font-semibold text-white">{story.name}</p>}
          {story.detail && <p className="tag mt-0.5 text-white/50">{story.detail}</p>}
        </figcaption>
      )}
    </figure>
  );
}
