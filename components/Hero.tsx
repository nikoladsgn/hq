import { SiteContent } from "@/lib/content";

export default function Hero({ site }: { site: SiteContent["site"] }) {
  return (
    <header className="relative overflow-hidden bg-navy text-paper">
      {/* subtle dotted texture, like halftone print stock */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #FAF6EC 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 pb-16 pt-14 sm:pt-20">
        <div className="scroll-fade flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-gold-light">
          <span className="h-px w-8 bg-gold-light/60" />
          Studio Order Ticket
        </div>

        <h1 className="scroll-fade mt-5 font-display text-4xl font-semibold italic leading-[1.05] sm:text-6xl">
          Pricelist
          <br />
          <span className="not-italic text-gold-light">Custom Design</span>
        </h1>

        <p className="scroll-fade mt-5 max-w-xl text-sm text-paper/70 sm:text-base">
          {site.tagline}
        </p>

        <div className="scroll-fade mt-8 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-paper/20 bg-paper/5 px-4 py-1.5 font-mono text-xs tracking-wide">
            {site.owner} · {site.year}
          </span>
          {site.instagram && (
            <a
              href={`https://instagram.com/${site.instagram}`}
              target="_blank"
              className="rounded-full border border-gold-light/40 px-4 py-1.5 font-mono text-xs tracking-wide text-gold-light transition hover:bg-gold-light/10"
            >
              @{site.instagram}
            </a>
          )}
        </div>
      </div>

      {/* perforated tear edge into the page below */}
      <div className="perf-edge text-navy h-4 bg-navy" />
    </header>
  );
}
