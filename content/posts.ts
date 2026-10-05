/**
 * News and blog posts. To publish one, add an object at the top of POSTS and redeploy; it appears on the home page
 * ("News & blogs"), on /blog and at /blog/<slug>. Newest first is by `date` (undated last), so order in the file does not matter.
 *
 * Body blocks: a string is a paragraph, { h: "…" } a sub-heading, { list: [...] } a bullet list.
 * `image` is optional: posts without one get a typographic cover in the site's style.
 */
export type PostKind = "News" | "Blog";
export type Block = string | { h: string } | { list: string[] };

export type Post = {
  slug: string;
  kind: PostKind;
  /** Short topic tag, e.g. "IELTS", "Australia", "Visa update". */
  tag: string;
  title: string;
  excerpt: string;
  /** YYYY-MM-DD; leave out when unknown (undated posts sort last and show no date). */
  date?: string;
  image?: string;
  body: Block[];
  /** Call to action at the end of the post (defaults to free counselling). */
  cta?: { label: string; course: string; country?: string };
};

const POSTS: Post[] = [
  {
    slug: "australia-semester-1-2027-intake-open",
    kind: "News",
    tag: "Australia",
    title: "Australia Semester 1, 2027 intake is now open",
    excerpt: "Universities in Australia are accepting applications for the February / March 2027 intake. Here is how to get your application in on time.",
    date: "2026-10-05",
    body: [
      "Applications for the Semester 1, 2027 intake at Australian universities (classes usually starting February or March 2027) are now open.",
      "Deadlines differ by university and course, and popular courses can close early or fill up before the official date, so it pays to apply early.",
      { h: "What you need to get started" },
      { list: [
        "Your academic transcripts and marksheets",
        "An English test score (IELTS, PTE, TOEFL; we will check what your university accepts), or a test date",
        "A valid passport",
        "A statement of purpose and your CV",
      ] },
      { h: "How we help" },
      "Our counsellors shortlist courses that fit your profile and budget, prepare and submit your applications, help with your SOP, scholarships and education loan, and then file your student visa.",
    ],
    cta: { label: "Talk to us about the Australia intake", course: "Australia Semester 1 2027 intake", country: "Australia" },
  },
  {
    slug: "enrol-now-and-get-your-required-band",
    kind: "Blog",
    tag: "IELTS",
    title: "Enrol now and get your Required Band!",
    excerpt: "Every IELTS student at Western World starts with a diagnostic test, gets a personal study plan and practises with regular mock tests.",
    image: "/images/latest/blog-1.jpg",
    body: [
      "Our IELTS course starts with a thorough diagnosis of your current English language skills and exam readiness, carried out by a senior trainer who then builds a roadmap to your desired band.",
      { list: [
        "One-to-one sessions with expert trainers, in class or online",
        "A customised study plan based on your strengths and weaknesses",
        "Comprehensive mock tests after every module",
        "A free trial class before you enrol",
      ] },
      "Once you are scoring your target band in our internal mock tests, you are ready to pick an exam date.",
    ],
    cta: { label: "Book a free IELTS trial class", course: "IELTS trial class" },
  },
];

export const posts = [...POSTS].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

export const post = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

/** Rough reading time for the card meta. */
export const readMinutes = (p: Post) => {
  const words = p.body.flatMap((b) => (typeof b === "string" ? [b] : "h" in b ? [b.h] : b.list)).join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};
