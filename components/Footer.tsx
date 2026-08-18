import React from 'react';

export default function Footer({ site }: { site: any }) {
  // Fitur Auto-Text WA (Bisa bos edit teksnya di sini nanti)
  const waMessage = "Halo tim Nikola.dsgn! 👋%0A%0ASaya mau order desain nih.%0ABoleh minta form pengisian brief-nya?";

  return (
    <footer className="bg-paper pb-12 pt-8">
      <div className="mx-auto max-w-3xl px-6 text-center">
        {/* CTA Box Kuning */}
        <div className="mb-16 rounded-3xl bg-gold p-8 shadow-2xl md:p-12">
          <h2 className="mb-4 font-display text-3xl font-bold text-navy md:text-4xl">Order desainmu sekarang!</h2>
          <p className="mb-8 text-sm font-medium text-navy/80 md:text-base">Kirim brief lengkap via WhatsApp, tim kami bantu proses dari DP sampai file final.</p>
          <a
            href={`https://wa.me/${site.whatsapp}?text=${waMessage}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-full bg-navy px-8 py-4 text-sm font-bold tracking-wide text-white transition-transform hover:scale-105"
          >
            Chat via WhatsApp →
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs font-medium tracking-wider text-ink/40">
          {site.brand} — {site.year} · Terima kasih telah mempercayakan desain Anda kepada kami 🙏
        </p>
      </div>
    </footer>
  );
}