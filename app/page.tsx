import { getContent } from "@/lib/content";
import Hero from "@/components/Hero";
import CategoryNav from "@/components/CategoryNav";
import PriceCategory from "@/components/PriceCategory";
import TermsSection from "@/components/TermsSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  const content = getContent();
  
  // Ini kalimat auto-text WA yang akan otomatis muncul saat tombol ditekan
  const waMessage = "Halo tim Nikola.dsgn! 👋%0A%0ASaya mau order desain nih.%0ABoleh minta form pengisian brief-nya?";

  return (
    <main className="bg-paper min-h-screen relative">
      <Hero site={content.site} />

      <div className="mx-auto max-w-4xl px-6 pb-20">
        <CategoryNav categories={content.categories} />

        {content.site.heroNote && (
          <p className="mt-6 mb-12 rounded-lg border border-dashed border-white/20 bg-navy/50 px-4 py-3 text-xs text-ink/70 text-center">
            ⓘ {content.site.heroNote}
          </p>
        )}

        {content.categories.map((cat: any, i: number) => (
          <PriceCategory key={cat.id} category={cat} index={i} />
        ))}
      </div>

      <TermsSection terms={content.terms} />
      <Footer site={content.site} />

      {/* Tombol WA Melayang (Warna Gold) */}
      <a
        href={`https://wa.me/${content.site.whatsapp}?text=${waMessage}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold shadow-[0_0_20px_rgba(226,166,59,0.3)] transition-transform hover:scale-110 hover:bg-gold-light"
        aria-label="Chat WhatsApp"
      >
        <svg className="h-8 w-8 text-navy pl-[1px] pt-[1px]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.031 22.105c-1.579 0-3.085-.399-4.428-1.115l-4.945 1.302 1.325-4.819c-.792-1.381-1.21-2.934-1.21-4.57 0-5.313 4.318-9.63 9.63-9.63 5.311 0 9.63 4.318 9.63 9.63 0 5.311-4.318 9.63-9.63 9.63z" />
        </svg>
      </a>
    </main>
  );
}