/**
 * Proof from the old site: students collecting their visas at our office, and IELTS scorecards.
 * Video stories: add a YouTube video id to a slot (the part after "v=" or after "youtu.be/") and it goes live;
 * slots without an id show a "coming soon" frame so the layout is ready.
 */

const range = (from: number, to: number, skip: number[] = []) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i).filter((n) => !skip.includes(n));

/** Visa handovers (student holding the passport with the visa). */
export const VISA_WINS = range(1, 34, [33]).map((n) => `/ieltsstu/ielts${n}.jpeg`);

/** IELTS scorecards. */
export const SCORECARDS = [
  "1.png", "2.png", "3.jpg", "4.png", "5.jpeg", "6.jpeg", "7.jpeg", "8.png", "9.jpg", "10.jpg",
  "12.png", "13.jpg", "14.png", "15.png", "16.png", "17.jpeg", "18.png", "19.jpg", "20.jpg",
].map((f) => `/ieltsstu/${f}`);

export type VideoStory = {
  /** YouTube video id; leave empty until the video is published. */
  youtubeId?: string;
  name?: string;
  /** e.g. "MSc, University of Leeds · UK" */
  detail?: string;
};

export const VIDEO_STORIES: VideoStory[] = [{}, {}, {}];
