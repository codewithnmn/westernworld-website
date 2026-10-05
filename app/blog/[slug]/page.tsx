import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import WithCallback from "@/components/WithCallback";
import { PostCard, PostCover, PostMeta } from "@/components/news";
import { Section } from "@/components/blocks";
import { post as findPost, posts } from "@/content/posts";
import { enquire } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const p = findPost((await params).slug);
  return p ? { title: p.title, description: p.excerpt, openGraph: { type: "article", ...(p.image ? { images: [p.image] } : {}) } } : {};
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const p = findPost((await params).slug);
  if (!p) notFound();
  const cta = p.cta ?? { label: "Book free counselling", course: "Free counselling" };
  const more = posts.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 pt-10 pb-12 lg:pt-14">
          <Link href="/blog" className="tag inline-flex items-center gap-1.5 text-slate-500 hover:text-accent">
            <ArrowLeft className="size-3.5" /> News & blogs
          </Link>
          <div className="mt-6 grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <PostMeta p={p} />
              <h1 className="mt-3 text-4xl leading-[1.04] font-semibold sm:text-6xl">{p.title}</h1>
              <p className="mt-5 max-w-2xl text-lg text-slate-600">{p.excerpt}</p>
            </div>
            <PostCover p={p} className="aspect-[16/10] rounded-xl" sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
        </div>
      </section>

      <WithCallback source={`Blog: ${p.title}`} course={cta.course} country={cta.country}>
        <article className="max-w-2xl space-y-5 text-lg leading-relaxed text-slate-700">
          {p.body.map((b, i) =>
            typeof b === "string" ? <p key={i}>{b}</p>
              : "h" in b ? <h2 key={i} className="pt-4 text-3xl font-semibold">{b.h}</h2>
                : (
                  <ul key={i} className="space-y-2">
                    {b.list.map((x) => (
                      <li key={x} className="flex gap-3"><span className="mt-3 size-1.5 shrink-0 rounded-full bg-accent" />{x}</li>
                    ))}
                  </ul>
                ),
          )}
        </article>
        <Link href={enquire(cta.course, cta.country)}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-accent-dark">
          {cta.label} <ArrowRight className="size-4" />
        </Link>
      </WithCallback>

      {more.length > 0 && (
        <Section className="border-t border-line bg-white">
          <h2 className="mb-8 text-3xl font-semibold">More from News & blogs</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((x) => <PostCard key={x.slug} p={x} />)}
          </div>
        </Section>
      )}
    </>
  );
}
