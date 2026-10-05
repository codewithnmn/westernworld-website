import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ClipboardCheck, MapPin, Plus, Target, UserRound } from "lucide-react";
import BoardingPass from "@/components/BoardingPass";
import NewsletterBox from "@/components/NewsletterBox";
import VideoStories from "@/components/VideoStories";
import WallOfWins from "@/components/WallOfWins";
import { Packages, Section, SectionTitle } from "@/components/blocks";
import { DeparturesBoard, JourneyRoute } from "@/components/journey";
import { NewsSection } from "@/components/news";
import { HOME_PACKAGES } from "@/content/copy";
import { LEGS, TESTS } from "@/content/services";
import { SCORECARDS, VISA_WINS } from "@/content/testimonials";
import { DESTINATIONS, SITE, enquire, tel } from "@/lib/site";

const FAQ = [
  ["What type of learning experience should I expect?",
    "The content will be a mix of interactive video lectures, reading material, practice quizzes and mock tests along with daily private sessions with your trainer."],
  ["Can I get a trial class to understand your teaching style?",
    "Yes, if you want a taste of what our online class experience is and how intense can it be. You can request for a free session with us."],
  ["How is this course different from other courses?", [
    "This course starts with a thorough diagnosis of your current English Language skills and IELTS Exam readiness assessment.",
    "This assessment is conducted/analysed by a senior trainer who defines a roadmap for you to get your desired band in 1 attempt.",
    "Based on the analysis of your strengths and weaknesses done by the senior trainer you are allotted multiple trainers who will work with on your areas for improvement.",
    "Your Senior Trainer evaluates your performance every week. Based on your progress, your Senior trainer, along with the other trainers, will customize your study plan for sustained improvement.",
    "After sufficient language improvement, you are directed to IELTS specific training",
    "In the end you are put on a rigorous mock test routine",
    "Once you start scoring your desired bands in our internal IELTS Mock Tests you are ready to pick an exam date",
  ]],
  ["How long are the personal training sessions?", "Each personal training session is of a total duration of 1 hour."],
] as const;

const COACHING = [
  ["Pre-training assessment", "This course starts with a thorough diagnosis of your current English Language skills and IELTS Exam readiness assessment."],
  ["Customized study plan", "Based on the assessment, the Senior Trainer creates a tailored study plan, specifically for you. From there on, multiple trainers regularly guide, evaluate and monitor your progress."],
  ["Mock tests & exam conditioning", "Throughout the program, you will give over 30 mock tests, and discuss and improve upon each one of them with your trainer so you are 100% exam ready on the day of the test."],
  ["3:1 faculty to student ratio", "You will always have multiple trainers collectively working on you to achieve your desired band, with daily private classes to learn key concepts and get your doubts answered."],
];

const STATS = [["2000+", "Enrolled students"], ["600+", "Reviews"], ["40+", "Courses"], [String(DESTINATIONS.length), "Study destinations"]];

const serviceCount = LEGS.reduce((n, l) => n + l.services.length, 0);

/** A passport-style rubber stamp (decorative). */
function Stamp({ text, sub, className }: { text: string; sub: string; className: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <defs><path id={`arc-${text}`} d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" /></defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text fontFamily="var(--ff-mono)" fontSize="11" letterSpacing="3" fill="currentColor">
        <textPath href={`#arc-${text}`}>{`${sub} · ${sub} · `}</textPath>
      </text>
      <text x="60" y="65" textAnchor="middle" fontFamily="var(--ff-mono)" fontSize="13" fontWeight="600" fill="currentColor">{text}</text>
    </svg>
  );
}

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden">
        <div className="map-grid absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
        <Stamp text="APPROVED" sub="STUDENT VISA" className="absolute top-10 right-[46%] -z-10 hidden size-36 rotate-[-14deg] text-accent/25 lg:block" />
        <Stamp text="ARRIVED" sub="WELCOME" className="absolute bottom-10 left-[38%] -z-10 hidden size-28 rotate-[10deg] text-brand/15 lg:block" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-10 pb-16 lg:grid-cols-[1.1fr_1fr] lg:pt-16 lg:pb-24">
          <div>
            <p className="tag inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-ink">
              <span className="size-1.5 rounded-full bg-accent" /> Study abroad · Visa · IELTS / PTE · Rohtak
            </p>
            <h1 className="mt-6 text-[2.75rem] leading-[0.98] font-semibold sm:text-7xl xl:text-[5.25rem]">
              Every step to your campus abroad.{" "}
              <span className="relative whitespace-nowrap text-accent">
                Under one roof.
                <svg viewBox="0 0 300 12" className="absolute -bottom-2 left-0 w-full text-accent/40" preserveAspectRatio="none" aria-hidden>
                  <path d="M2 9 C 80 2, 200 2, 298 7" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-600">
              Career counselling, test prep, applications, SOPs, scholarships, loans, the visa, forex, flights, a room and
              your first part-time job. {serviceCount} services, one team, from your first doubt to your first day abroad.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="#route" className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-accent">
                See the route <ArrowRight className="size-4" />
              </Link>
              <a href={tel(SITE.phones[0])} className="rounded-full border border-ink/20 px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-ink">
                Call {SITE.phones[0]}
              </a>
            </div>

            <Link href="#wins" className="group mt-10 flex w-fit items-center gap-4">
              <span className="flex -space-x-3">
                {[VISA_WINS[19], VISA_WINS[0], VISA_WINS[28], VISA_WINS[8]].map((src) => (
                  <span key={src} className="relative size-12 overflow-hidden rounded-full ring-3 ring-paper">
                    <Image src={src} alt="" fill sizes="48px" className="object-cover" />
                  </span>
                ))}
              </span>
              <span className="text-sm leading-snug text-slate-600">
                <span className="font-semibold text-ink">{VISA_WINS.length} visas, {SCORECARDS.length} scorecards</span> on our wall.
                <span className="block font-medium text-accent group-hover:underline">See real students →</span>
              </span>
            </Link>
          </div>

          <div id="counselling" className="relative scroll-mt-28 lg:pl-6">
            <BoardingPass />
          </div>
        </div>
      </section>

      {/* ── Services ticker ─────────────────────────────────── */}
      <div className="overflow-hidden border-y border-ink bg-ink py-3 text-white" aria-hidden>
        <div className="marquee flex w-max gap-8 whitespace-nowrap">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex gap-8">
              {LEGS.flatMap((l) => l.services).map((s) => (
                <span key={s.slug} className="flex items-center gap-8 font-display text-lg font-medium">
                  {s.name}<span className="text-accent">✈</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── The route (all services) ────────────────────────── */}
      <Section id="route">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionTitle eyebrow="The route" title={<>Four legs. {serviceCount} stops.<br className="hidden sm:block" /> One counsellor who knows your file.</>} />
          <p className="max-w-sm text-slate-600 lg:mb-14">
            Most students juggle a coaching centre, an agent, a bank and a travel agent. With us it is one team that
            already knows your story, so nothing gets lost between steps.
          </p>
        </div>
        <JourneyRoute />
      </Section>

      {/* ── Wall of wins (testimonials) ─────────────────────── */}
      <section id="wins" className="relative scroll-mt-24 overflow-hidden bg-brand-dark py-16 lg:py-24">
        <div className="map-grid absolute inset-0 opacity-30 [filter:invert(1)]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionTitle light eyebrow="Wall of wins" title={<>Not stock photos.<br />Our students, their visas.</>}
                          intro="Every photo was taken at our office the day a student collected their passport, or got their IELTS result." />
            <Link href="/success-stories" className="tag mb-14 hidden items-center gap-1 text-white/70 hover:text-white lg:inline-flex">
              All success stories <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
          <WallOfWins limit={10} />

          <div className="mt-20 border-t border-white/10 pt-12">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="tag text-sun">In their words</p>
                <h3 className="mt-2 text-3xl font-semibold text-white">Student video stories</h3>
              </div>
              <p className="max-w-sm text-sm text-white/60">Students talk about their journey, from the first counselling session to landing abroad.</p>
            </div>
            <VideoStories />
          </div>
        </div>
      </section>

      {/* ── Destinations ────────────────────────────────────── */}
      <Section id="destinations">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:items-center">
          <div>
            <SectionTitle eyebrow="Global education" title="Where to?" />
            <p className="-mt-6 text-lg text-slate-600">
              We help with universities and colleges in {DESTINATIONS.length} countries: courses, admissions,
              scholarships and the visa. Pick a destination to see its universities.
            </p>
            <Image src={VISA_WINS[29]} alt="A Western World student receiving her visa at our office" width={640} height={600}
                   sizes="(min-width: 1024px) 33vw, 100vw" className="mt-8 hidden aspect-[4/3] rounded-xl object-cover object-[50%_35%] lg:block" />
          </div>
          <DeparturesBoard />
        </div>
      </Section>

      {/* ── Test prep ───────────────────────────────────────── */}
      <Section id="test-prep" className="bg-white">
        <SectionTitle eyebrow="Test prep" title="Get the score. Then get the seat." intro="Coaching for every major English test, online or in our classrooms, with a free trial class first." />
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3 lg:grid-cols-6">
          {TESTS.map((t) => (
            <li key={t.name}>
              <Link href={t.href} className="group flex h-full min-h-32 flex-col justify-between gap-3 bg-white p-5 transition hover:bg-ink">
                <ArrowUpRight className="size-5 self-end text-slate-300 transition group-hover:text-sun" />
                <span>
                  <span className="block font-display text-lg leading-tight font-semibold text-ink group-hover:text-white">{t.name}</span>
                  <span className="mt-1 block text-xs text-slate-500 group-hover:text-white/60">{t.note}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h3 className="text-3xl font-semibold">How our coaching works</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                [<UserRound key="u" />, "One-to-one sessions", "Personal sessions with expert trainers, planned around you, in class or online."],
                [<Target key="t" />, "A study plan for every student", "Built on your own strengths and weaknesses."],
                [<ClipboardCheck key="c" />, "Comprehensive mock tests", "A mock test after every module."],
              ].map(([icon, title, text]) => (
                <div key={String(title)} className="flex gap-4 rounded-xl border border-line p-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-paper text-ink [&_svg]:size-5">{icon}</span>
                  <span><span className="block font-semibold text-ink">{title}</span><span className="text-sm text-slate-600">{text}</span></span>
                </div>
              ))}
            </div>
          </div>
          <ol className="relative space-y-0 border-l-2 border-dashed border-line pl-8">
            {COACHING.map(([title, text], n) => (
              <li key={title} className="relative pb-8 last:pb-0">
                <span className="absolute top-0 -left-[2.65rem] flex size-8 items-center justify-center rounded-full bg-accent font-mono text-xs text-white">{n + 1}</span>
                <h4 className="text-xl font-semibold">{title}</h4>
                <p className="mt-1 text-slate-600">{text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h3 className="text-3xl font-semibold">IELTS General packages</h3>
            <Link href="/online-courses" className="tag inline-flex items-center gap-1 text-accent hover:underline">Online course fees <ArrowUpRight className="size-3.5" /></Link>
          </div>
          <Packages packages={HOME_PACKAGES} source="Home packages" />
        </div>
      </Section>

      {/* ── Why us ──────────────────────────────────────────── */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <Image src={VISA_WINS[19]} alt="A Western World counsellor handing a student his visa" width={1280} height={720}
                   sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[16/11] w-full rounded-xl object-cover" />
            <div className="absolute -bottom-6 left-6 rounded-xl bg-sun px-5 py-4 shadow-xl">
              <p className="font-display text-4xl font-semibold text-ink">2000+</p>
              <p className="tag text-ink/70">Enrolled students</p>
            </div>
          </div>
          <div>
            <SectionTitle eyebrow="Why Western World" title="We study every case before we take it on." />
            <div className="-mt-4 space-y-4 text-slate-600">
              <p>
                With hard work and transparency, Western World Visa Services has become one of the leading education
                consultancies in the region. Our team of passionate, experienced counsellors works on every case
                individually, taking care of each student&rsquo;s situation and preferences.
              </p>
              <p>
                We stay up to date with every change in student migration rules, and we keep you informed of your
                case status at every stage.
              </p>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
              {STATS.map(([n, label]) => (
                <div key={label} className="flex flex-col bg-paper p-4">
                  <dt className="tag order-2 text-slate-500">{label}</dt>
                  <dd className="font-display text-3xl font-semibold text-ink">{n}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* ── News & blogs ────────────────────────────────────── */}
      <Section id="news" className="border-t border-line">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionTitle eyebrow="News & blogs" title="Intakes, visa updates and guides" />
          <Link href="/blog" className="tag mb-10 inline-flex items-center gap-1 text-ink hover:text-accent lg:mb-14">
            All news & blogs <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
        <NewsSection />
      </Section>

      {/* ── FAQ + office ────────────────────────────────────── */}
      <Section className="bg-white">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div>
            <SectionTitle eyebrow="FAQ" title="Questions students ask us" />
            <div className="divide-y divide-line border-y border-line">
              {FAQ.map(([q, a]) => (
                <details key={q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold text-ink">
                    {q}
                    <Plus className="size-5 shrink-0 text-accent transition group-open:rotate-45" />
                  </summary>
                  {typeof a === "string" ? <p className="mt-3 leading-relaxed text-slate-600">{a}</p> : (
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-slate-600">{a.map((x) => <li key={x}>{x}</li>)}</ul>
                  )}
                  {q.startsWith("Can I get a trial") && (
                    <Link href={enquire("Trial class")} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                      Click here to schedule a trial class <ArrowRight className="size-4" />
                    </Link>
                  )}
                </details>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <NewsletterBox />
            <div className="overflow-hidden rounded-xl border border-line">
              <div className="flex items-center justify-between bg-paper px-5 py-3">
                <span className="tag text-ink">Visit our office</span>
                <MapPin className="size-4 text-accent" />
              </div>
              <div className="p-5">
                <p className="font-semibold text-ink">Rohtak, Haryana</p>
                <p className="mt-1 text-sm text-slate-600">{SITE.address}</p>
                <Link href="/contact-us" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
                  Directions & contact <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
