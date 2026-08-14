import { SiteContent } from "@/lib/content";

export default function Footer({ site }: { site: SiteContent["site"] }) {
  const waLink = site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
        "Halo, saya mau order desain di " + site.brand
      )}`
    : "#";

  return (
    <footer className="bg-paper py-16">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="rounded-3xl bg-gold px-6 py-10 sm:px-10">
          <h2 className="font-display text-2xl font-semibold text-navy sm:text-3xl">
            Order desainmu sekarang!
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-navy/70">
            Kirim brief lengkap via WhatsApp, tim kami bantu proses dari DP
            sampai file final.
          </p>
          <a
            href={waLink}
            target="_blank"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 font-mono text-sm font-medium text-paper transition hover:bg-navy-light"
          >
            Chat via WhatsApp →
          </a>
        </div>

        <p className="mt-10 font-mono text-xs text-ink/40">
          {site.brand} — {site.year} · Terima kasih telah mempercayakan
          desain Anda kepada kami 🙏
        </p>
      </div>
    </footer>
  );
}
