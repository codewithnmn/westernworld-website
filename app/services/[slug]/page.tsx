import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, Info } from "lucide-react";
import WithCallback from "@/components/WithCallback";
import { CtaBand, PageHero } from "@/components/blocks";
import { SERVICES, TESTS, service as findService, serviceHref } from "@/content/services";

/** Services with their own page (the others link to an existing page, e.g. Visa filing → /visa-assistance). */
const OWN_PAGE = SERVICES.filter((s) => !s.href);

export const dynamicParams = false;

export function generateStaticParams() {
  return OWN_PAGE.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const s = findService((await params).slug);
  return s ? { title: s.name, description: s.short } : {};
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const s = findService((await params).slug);
  if (!s || s.href) notFound();
  const related = s.leg.services.filter((x) => x.slug !== s.slug);
  const isTests = s.slug === "english-test-preparation";

  return (
    <>
      <PageHero title={s.name} label={`${s.leg.label} · ${s.leg.title}`} subtitle={s.short}
                crumbs={[{ label: "Services", href: "/services" }, { label: s.name }]} />
      <WithCallback source={`Service: ${s.name}`} course={s.name}>
        <p className="text-xl leading-relaxed text-ink">{s.intro}</p>

        <h2 className="mt-12 text-3xl font-semibold">What you get</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {s.includes.map((x) => (
            <li key={x} className="flex gap-3 rounded-xl border border-line bg-white p-4">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-ink text-white"><Check className="size-3.5" /></span>
              <span className="text-slate-700">{x}</span>
            </li>
          ))}
        </ul>

        {isTests && (
          <>
            <h2 className="mt-12 text-3xl font-semibold">Pick your test</h2>
            <ul className="mt-5 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {TESTS.map((t) => (
                <li key={t.name}>
                  <Link href={t.href} className="group flex h-full items-center justify-between gap-4 bg-white p-5 hover:bg-paper">
                    <span><span className="block font-semibold text-ink group-hover:text-accent">{t.name}</span><span className="text-sm text-slate-500">{t.note}</span></span>
                    <ArrowUpRight className="size-5 text-slate-300 group-hover:text-accent" />
                  </Link>
                </li>
              ))}
            </ul>
            <div id="duolingo" className="mt-8 scroll-mt-32 rounded-xl bg-ink p-6 text-white">
              <p className="tag text-sun">Duolingo English Test</p>
              <p className="mt-2 text-white/80">
                The Duolingo English Test is taken online from home and takes about an hour, with results usually within a
                few days. A growing number of universities accept it, but not all, and visa rules differ by country: we
                check that it is accepted for your course and visa before you book, then coach you on its question types
                with timed practice tests.
              </p>
            </div>
          </>
        )}

        {s.goodToKnow && (
          <p className="mt-8 flex gap-3 rounded-xl border border-sun bg-sun/10 p-4 text-sm text-ink">
            <Info className="size-5 shrink-0 text-ink/60" />{s.goodToKnow}
          </p>
        )}

        <h2 className="mt-12 text-3xl font-semibold">How it works</h2>
        <ol className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            ["Tell us about you", "Fill in the form or call us. A counsellor calls you back."],
            ["Get a plan", "We look at your profile and agree what we will do, and by when."],
            ["We do the work with you", "You always know the status and the next step."],
          ].map(([title, text], n) => (
            <li key={title} className="rounded-xl border border-dashed border-ink/20 p-5">
              <span className="font-mono text-sm text-accent">0{n + 1}</span>
              <h3 className="mt-1 text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-slate-600">{text}</p>
            </li>
          ))}
        </ol>

        {related.length > 0 && (
          <>
            <h2 className="mt-12 text-3xl font-semibold">Also in {s.leg.title.toLowerCase()}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={serviceHref(r)} className="group flex h-full items-center justify-between gap-4 rounded-xl border border-line bg-white p-4 hover:border-ink">
                    <span><span className="block font-semibold text-ink group-hover:text-accent">{r.name}</span><span className="text-sm text-slate-500">{r.short}</span></span>
                    <ArrowUpRight className="size-5 shrink-0 text-slate-300 group-hover:text-accent" />
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </WithCallback>
      <CtaBand title={`Talk to us about ${s.name.toLowerCase()}`} course={s.name} />
    </>
  );
}
