import { getContent } from "@/lib/content";
import Hero from "@/components/Hero";
import CategoryNav from "@/components/CategoryNav";
import PriceCategory from "@/components/PriceCategory";
import TermsSection from "@/components/TermsSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  const content = getContent();

  return (
    <main className="bg-paper">
      <Hero site={content.site} />

      <div className="mx-auto max-w-4xl px-6">
        <CategoryNav categories={content.categories} />

        {content.site.heroNote && (
          <p className="mt-6 rounded-lg border border-dashed border-ink/15 bg-white/50 px-4 py-3 text-xs text-ink/60">
            ⓘ {content.site.heroNote}
          </p>
        )}

        {content.categories.map((cat, i) => (
          <PriceCategory key={cat.id} category={cat} index={i} />
        ))}
      </div>

      <TermsSection terms={content.terms} />
      <Footer site={content.site} />
    </main>
  );
}
