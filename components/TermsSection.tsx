"use client";
import React from 'react';

export default function TermsSection({ terms }: { terms: any[] }) {
  return (
    <section className="py-16 border-t border-white/10 bg-paper">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-4 opacity-80">
            <div className="h-px w-8 bg-gold"></div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Term & Condition</p>
            <div className="h-px w-8 bg-gold"></div>
          </div>
          <h2 className="font-display text-4xl font-semibold italic text-white">Syarat & Ketentuan</h2>
        </div>
        <div className="space-y-4">
          {terms.map((term: any, i: number) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-navy p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-bold text-gold">{term.title}</h3>
              <ul className="list-inside list-disc space-y-2 text-sm text-ink/80">
                {term.items.map((item: string, idx: number) => (
                  <li key={idx} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}