import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronRight, Clock, Phone } from "lucide-react";
import EnquiryForm from "@/components/EnquiryForm";
import PhotoWall from "@/components/PhotoWall";
import type { Package, TestSection } from "@/content/copy";
import { SITE, enquire, tel } from "@/lib/site";

/** Page title band with breadcrumb, used on every inner page. */
export function PageHero({ title, crumbs = [], subtitle, image = "/images/banner8.jpg", label }: {
  title: string;
  crumbs?: { label: string; href?: string }[];
  subtitle?: ReactNode;
  image?: string;
  /** Small mono line above the title, e.g. "Leg 02 · Prepare". */
  label?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-dark">
      <Image src={image} alt="" fill priority className="object-cover opacity-20 mix-blend-luminosity" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/95 to-brand-dark/50" />
      <div className="map-grid absolute inset-0 opacity-30 [filter:invert(1)]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-14 lg:py-20">
        <nav aria-label="Breadcrumb" className="tag mb-5 flex flex-wrap items-center gap-1 text-white/50">
          <Link href="/" className="hover:text-white">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1">
              <ChevronRight className="size-3" />
              {c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span className="text-white/80">{c.label}</span>}
            </span>
          ))}
        </nav>
        {label && <p className="tag mb-3 text-sun">{label}</p>}
        <h1 className="max-w-4xl text-4xl leading-[1.02] font-semibold text-white sm:text-6xl">{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{subtitle}</p>}
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, intro, center = false, light = false }: {
  eyebrow?: string; title: ReactNode; intro?: ReactNode; center?: boolean; light?: boolean;
}) {
  return (
    <div className={`mb-10 lg:mb-14 ${center ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}`}>
      {eyebrow && (
        <p className={`tag mb-3 flex items-center gap-2 ${center ? "justify-center" : ""} ${light ? "text-sun" : "text-accent"}`}>
          <span className="inline-block h-px w-6 bg-current" />{eyebrow}
        </p>
      )}
      <h2 className={`text-3xl leading-[1.05] font-semibold sm:text-5xl ${light ? "text-white" : ""}`}>{title}</h2>
      {intro && <p className={`mt-4 text-lg leading-relaxed ${light ? "text-white/70" : "text-slate-600"}`}>{intro}</p>}
    </div>
  );
}

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`scroll-mt-28 py-16 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4">{children}</div>
    </section>
  );
}

/** Course packages styled as tickets; "Book Now" goes to the enquiry form, pre-filled with the package. */
export function Packages({ packages }: { packages: Package[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {packages.map((p, i) => (
        <article key={p.name}
                 className={`group relative flex flex-col overflow-hidden rounded-xl border bg-white transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-dark/10 ${i === 1 ? "border-ink" : "border-line"}`}>
          {i === 1 && <span className="tag absolute top-4 right-4 z-10 rounded-full bg-sun px-2.5 py-1 text-ink">Most chosen</span>}
          {p.image && (
            <div className="relative h-40 overflow-hidden">
              <Image src={p.image} alt={p.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 768px) 33vw, 100vw" />
            </div>
          )}
          <div className="flex flex-1 flex-col p-6">
            <span className="tag text-accent">{p.weeksLabel}</span>
            <h3 className="mt-2 text-xl font-semibold">{p.name}</h3>
            {p.price && <p className="mt-2 font-display text-3xl font-semibold text-ink">{p.price}</p>}
            <p className="mt-2 flex-1 text-sm text-slate-600">{p.description}</p>
            <dl className="mt-5 grid grid-cols-2 border-y border-dashed border-line py-4 text-sm">
              <div><dt className="tag flex items-center gap-1 text-slate-400"><CalendarDays className="size-3" />Duration</dt><dd className="mt-1 font-semibold text-ink">{p.duration}</dd></div>
              <div><dt className="tag flex items-center gap-1 text-slate-400"><Clock className="size-3" />Training</dt><dd className="mt-1 font-semibold text-ink">{p.training}</dd></div>
            </dl>
            <Link href={enquire(p.name)}
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-accent">
              Book Now <ArrowRight className="size-4" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

/** "What is the IELTS … test like?" — four sections and scoring. */
export function TestDetails({ test }: {
  test: { title: string; question: string; intro: string; sections: TestSection[]; scores: string };
}) {
  return (
    <div>
      <h3 className="text-3xl font-semibold">{test.title}</h3>
      <p className="mt-2 font-semibold text-brand">{test.question}</p>
      <p className="mt-2 text-slate-600">{test.intro}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {test.sections.map((s) => (
          <div key={s.name} className="rounded-xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">{s.name}</h4>
            {s.summary && <p className="tag mt-1 text-accent">{s.summary}</p>}
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {s.points.map((p) => (
                <li key={p} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-brand" />{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-ink p-5 text-white">
        <h4 className="tag text-sun">Level and scores</h4>
        <p className="mt-2 text-sm text-white/80">{test.scores}</p>
      </div>
    </div>
  );
}

/** Student photo wall. */
export function Gallery({ images, title = "IELTS Students", intro }: { images: string[]; title?: string; intro?: string }) {
  if (images.length === 0) return null;
  // Visa handover photos fill their tile; scorecards and posters are shown whole so the text stays readable.
  const photos = images.some((s) => s.includes("/ieltsstu/ielts"));
  return (
    <Section className="bg-paper-dark/60">
      <SectionTitle eyebrow="Our results" title={title} intro={intro} center />
      <PhotoWall images={images} alt="Western World Visa Services student" fit={photos ? "cover" : "contain"} limit={12} />
    </Section>
  );
}

/** Sticky side form used on content pages ("Request call back"). */
export function CallbackCard({ source, course, country, title = "Request call back" }: {
  source: string; course?: string; country?: string; title?: string;
}) {
  return (
    <aside className="overflow-hidden rounded-xl bg-ink shadow-2xl shadow-brand-dark/20 lg:sticky lg:top-32 lg:self-start">
      <div className="flex items-center justify-between bg-accent px-6 py-2.5">
        <span className="tag text-white">Free · No obligation</span>
        <span className="barcode h-4 w-16 text-white/60" aria-hidden />
      </div>
      <div className="p-6">
        <EnquiryForm dark title={title} subtitle="Leave your details and our counsellor will call you." source={source}
                     country={country} defaults={{ message: course ? `I am interested in ${course}.` : undefined }} />
        <div className="mt-5 border-t border-dashed border-white/15 pt-4 text-sm text-white/80">
          <p className="tag mb-2 text-white/50">Prefer to call?</p>
          {SITE.phones.map((p) => (
            <a key={p} href={tel(p)} className="flex items-center gap-2 py-0.5 hover:text-white"><Phone className="size-4" />{p}</a>
          ))}
        </div>
      </div>
    </aside>
  );
}

export function CtaBand({ title = "Ready to start your journey abroad?", text = "Talk to our counsellors today. Someone from our team will get in touch with you.", course }: {
  title?: string; text?: string; course?: string;
}) {
  return (
    <section className="px-4 py-12">
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl bg-accent px-8 py-10 md:flex-row md:items-center lg:px-12">
        <span className="pointer-events-none absolute -right-6 -bottom-16 font-display text-[11rem] leading-none font-bold text-white/10 select-none" aria-hidden>✈</span>
        <div className="relative">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
          <p className="mt-2 text-white/85">{text}</p>
        </div>
        <div className="relative flex flex-wrap gap-3">
          <Link href={enquire(course)} className="inline-flex items-center gap-1.5 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-accent transition hover:bg-ink hover:text-white">
            Enquire now <ArrowUpRight className="size-4" />
          </Link>
          <a href={tel(SITE.phones[0])} className="rounded-full border-2 border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Call {SITE.phones[0]}</a>
        </div>
      </div>
    </section>
  );
}

export function Feature({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-line bg-white p-6 transition hover:border-ink">
      <div className="mb-5 flex size-11 items-center justify-center rounded-full bg-ink text-white [&_svg]:size-5">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-slate-600">{children}</div>
    </div>
  );
}
