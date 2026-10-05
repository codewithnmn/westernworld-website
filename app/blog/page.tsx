import type { Metadata } from "next";
import PostList from "@/components/PostList";
import { CtaBand, PageHero, Section } from "@/components/blocks";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "News & blogs",
  description: "Intake announcements, visa updates and study-abroad guides from Western World Visa Services.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero title="News & blogs" crumbs={[{ label: "News & blogs" }]} label="Intakes · Visa updates · Guides"
                subtitle="Intake announcements, visa rule changes and practical guides for studying abroad." />
      <Section>
        <PostList posts={posts} />
      </Section>
      <CtaBand course="Free counselling" />
    </>
  );
}
