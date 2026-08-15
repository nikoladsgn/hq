"use client";
import React, { useState } from 'react';

export default function PriceCategory({ category, index }: { category: any; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id={category.id} className="scroll-mt-32 mb-12 scroll-fade">
      <div className="mb-4 flex items-baseline gap-3">
        <span className="text-sm font-bold text-gold opacity-80">
          {(index + 1).toString().padStart(2, '0')}
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-ink">
          {category.title}
        </h2>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-navy-light text-xs uppercase tracking-wider text-ink/60">
              <tr>
                <th className="px-6 py-4 font-semibold">Paket</th>
                <th className="px-6 py-4 font-semibold">Jumlah</th>
                <th className="px-6 py-4 font-semibold text-gold">Harga</th>
                <th className="px-6 py-4 font-semibold">Pengerjaan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {category.tiers.map((tier: any, i: number) => (
                <tr key={i} className="transition-colors hover:bg-white/5">
                  <td className="px-6 py-4 font-medium text-ink">
                    {tier.badge && <span className="mr-2">{tier.badge}</span>}
                    {tier.name}
                  </td>
                  <td className="px-6 py-4 text-ink/70">{tier.qty}</td>
                  <td className="px-6 py-4 font-bold text-gold">{tier.price}</td>
                  <td className="px-6 py-4 text-ink/70">{tier.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {category.notes && category.notes.length > 0 && (
          <div className="border-t border-white/10 bg-navy-light/40">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex w-full items-center justify-center gap-2 py-3.5 text-xs font-semibold uppercase tracking-wider text-ink/50 transition-colors hover:text-gold focus:outline-none"
            >
              {isOpen ? "Tutup Catatan ⌃" : "Lihat Catatan & Syarat ⌄"}
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-6 pb-6 pt-2 text-[13px] text-ink/70">
                <ul className="list-inside list-disc space-y-2">
                  {category.notes.map((note: string, idx: number) => (
                    <li key={idx} className="leading-relaxed">{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}