import Link from "next/link";
import { ArrowUpRight, Plane } from "lucide-react";
import { LEGS, serviceHref } from "@/content/services";
import { country, universitiesOf } from "@/lib/content";
import { DESTINATIONS } from "@/lib/site";

/** All services as one route: four legs, numbered stops. */
/** Stop number of each service along the whole route (01, 02, …). */
const STOP = new Map(LEGS.flatMap((l) => l.services).map((s, i) => [s.slug, String(i + 1).padStart(2, "0")]));

export function JourneyRoute() {
  return (
    <div className="relative">
      {/* Flight path across the legs (desktop). */}
      <div className="absolute top-[2.15rem] right-[12%] left-[12%] hidden lg:block" aria-hidden>
        <div className="border-t-2 border-dashed border-ink/20" />
        <Plane className="fly absolute -top-[11px] size-5 rotate-45 text-accent [animation:plane_14s_ease-in-out_infinite_alternate]" />
      </div>
      <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {LEGS.map((leg) => (
          <li key={leg.id} className="relative flex flex-col">
            <div className="relative z-10 mx-auto mb-5 hidden size-[4.3rem] items-center justify-center rounded-full border-2 border-ink bg-paper font-mono text-sm font-medium text-ink lg:flex">
              {leg.label.replace("Leg ", "")}
            </div>
            <div className="flex flex-1 flex-col rounded-xl border border-line bg-white p-6">
              <p className="tag text-accent">{leg.label}</p>
              <h3 className="mt-1 text-3xl font-semibold">{leg.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{leg.blurb}</p>
              <ul className="mt-5 flex-1 divide-y divide-dashed divide-line border-t border-dashed border-line">
                {leg.services.map((s) => (
                    <li key={s.slug}>
                      <Link href={serviceHref(s)} className="group flex items-baseline gap-3 py-2.5">
                        <span className="font-mono text-[11px] text-slate-400">{STOP.get(s.slug)}</span>
                        <span className="flex-1 font-medium text-ink transition group-hover:text-accent">{s.name}</span>
                        <ArrowUpRight className="size-4 shrink-0 self-center text-slate-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                      </Link>
                    </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Study destinations as an airport departures board. */
export function DeparturesBoard() {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#0a0f2c] p-2 shadow-2xl shadow-brand-dark/30 ring-1 ring-white/5 sm:p-3">
      <div className="flex items-center justify-between px-3 py-3 sm:px-4">
        <p className="flex items-center gap-2 font-mono text-sm text-sun"><Plane className="size-4 rotate-45" /> DEPARTURES</p>
        <p className="tag hidden text-white/40 sm:block">From DEL · Typical non-stop / 1-stop time</p>
      </div>
      <div className="tag hidden grid-cols-[1.6fr_0.8fr_1fr_1fr_1fr] gap-4 border-y border-white/10 px-4 py-2 text-white/40 md:grid">
        <span>Destination</span><span>Code</span><span>Flight time</span><span>Universities</span><span className="text-right">Remarks</span>
      </div>
      <ul>
        {DESTINATIONS.map((d, i) => {
          const c = country(d.slug);
          const unis = c ? universitiesOf(c).length : 0;
          return (
            <li key={d.slug} className="border-b border-white/5 last:border-0">
              <Link href={`/study-in/${d.slug}`}
                    className="group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 rounded-lg px-3 py-3.5 font-mono transition hover:bg-white/[0.04] sm:px-4 md:grid-cols-[1.6fr_0.8fr_1fr_1fr_1fr]">
                <span className="flap flex items-baseline gap-2 text-lg text-white sm:text-xl" style={{ animationDelay: `${i * 70}ms` }}>
                  {d.name.toUpperCase()}
                  <span className="text-xs text-white/35 md:hidden">{d.code}</span>
                </span>
                <span className="hidden text-lg text-sun md:block">{d.code}</span>
                <span className="text-sm text-white/60 md:text-base md:text-white/80"><span className="md:hidden">✈ </span>{d.flight}</span>
                <span className="hidden text-white/80 md:block">{unis > 0 ? String(unis).padStart(2, "0") : "On request"}</span>
                <span className="col-start-2 row-span-2 row-start-1 text-right md:col-auto md:row-auto">
                  <span className="inline-flex items-center gap-1.5 rounded bg-sun/10 px-2 py-1 text-xs text-sun transition group-hover:bg-sun group-hover:text-ink">
                    <span className="size-1.5 animate-pulse rounded-full bg-current" /> BOARDING
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
