import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CtaBand, PageHero, Section } from "@/components/blocks";
import { LEGS, serviceHref } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Every study-abroad service in one place: counselling, test prep, applications, SOPs, scholarships, loans, visa, forex, flights, accommodation and part-time jobs.",
};

export default function ServicesPage() {
  const count = LEGS.reduce((n, l) => n + l.services.length, 0);
  return (
    <>
      <PageHero title="Everything between here and your campus" crumbs={[{ label: "Services" }]} label={`${count} services · 4 legs`}
                subtitle="Use one service or all of them. Either way, one team keeps your whole file together." />
      {LEGS.map((leg, i) => (
        <Section key={leg.id} id={leg.id} className={i % 2 ? "bg-white" : ""}>
          <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="tag text-accent">{leg.label}</p>
              <h2 className="mt-2 text-5xl font-semibold">{leg.title}</h2>
              <p className="mt-3 text-slate-600">{leg.blurb}</p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {leg.services.map((s) => (
                <li key={s.slug}>
                  <Link href={serviceHref(s)} className="group flex h-full flex-col rounded-xl border border-line bg-white p-6 transition hover:border-ink hover:shadow-xl hover:shadow-brand-dark/5">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-semibold group-hover:text-accent">{s.name}</h3>
                      <ArrowUpRight className="size-5 shrink-0 text-slate-300 transition group-hover:text-accent" />
                    </div>
                    <p className="mt-2 flex-1 text-slate-600">{s.short}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ))}
      <CtaBand title="Not sure where to start?" text="Book a free counselling session and we will tell you which services you actually need." course="Free counselling" />
    </>
  );
}
