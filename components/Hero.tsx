export default function Hero({ site }: { site: any }) {
  return (
    <div className="flex flex-col items-center justify-center pt-24 pb-12 text-center px-4">
      <div className="mb-6 flex items-center gap-4 opacity-80">
        <div className="h-px w-8 bg-gold"></div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
          Studio Order Ticket
        </p>
        <div className="h-px w-8 bg-gold"></div>
      </div>
      
      <h1 className="font-display flex flex-col gap-2 mb-8 text-5xl font-bold tracking-tight text-white md:text-7xl">
        <span className="text-white/40 italic font-serif text-4xl md:text-5xl">Pricelist</span>
        <span className="text-gold">{site.tagline}</span>
      </h1>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm font-medium">
        {site.instagram && (
          <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-ink/90 transition-all hover:bg-gold hover:text-navy">
            IG: @{site.instagram}
          </a>
        )}
        {site.tiktok && (
          <a href={`https://tiktok.com/@${site.tiktok}`} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-ink/90 transition-all hover:bg-gold hover:text-navy">
            TikTok: @{site.tiktok}
          </a>
        )}
        {site.lynk && (
          <a href={`https://${site.lynk}`} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-ink/90 transition-all hover:bg-gold hover:text-navy">
            {site.lynk}
          </a>
        )}
      </div>
    </div>
  );
}