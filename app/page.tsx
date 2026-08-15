import { getContent } from "@/lib/content";
import Hero from "@/components/Hero";
import CategoryNav from "@/components/CategoryNav";
import PriceCategory from "@/components/PriceCategory";
import TermsSection from "@/components/TermsSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  const content = getContent();

  return (
    <main className="bg-paper min-h-screen">
      <Hero site={content.site} />

      <div className="mx-auto max-w-4xl px-6 pb-20">
        <CategoryNav categories={content.categories} />

        {content.site.heroNote && (
          <p className="mt-6 mb-12 rounded-lg border border-dashed border-white/20 bg-navy/50 px-4 py-3 text-xs text-ink/70">
            ⓘ {content.site.heroNote}
          </p>
        )}

        {content.categories.map((cat: any, i: number) => (
          <PriceCategory key={cat.id} category={cat} index={i} />
        ))}
      </div>

      <TermsSection terms={content.terms} />
      <Footer site={content.site} />
    </main>
  );
}