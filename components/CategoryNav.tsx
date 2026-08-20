"use client";
import React from 'react';

export default function CategoryNav({ categories }: { categories: any[] }) {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Kita cari ID kategori pertama untuk tombol Jasa Desain (Biar otomatis scroll ke promo/feed)
  const firstCategoryId = categories.length > 0 ? categories[0].id : '';

  return (
    <div className="sticky top-4 z-50 mb-8 mt-8 flex flex-wrap justify-center gap-4 p-2">
      <button
        onClick={() => handleScroll(firstCategoryId)}
        className="rounded-full bg-gold px-6 py-3 text-sm font-bold tracking-wide text-navy shadow-lg transition-transform hover:scale-105"
      >
        🎨 Jasa Desain
      </button>
      <button
        onClick={() => handleScroll('video-editing')}
        className="rounded-full bg-navy-light border border-white/10 px-6 py-3 text-sm font-bold tracking-wide text-ink shadow-lg transition-transform hover:scale-105 hover:border-gold hover:text-gold"
      >
        🎬 Video Editing
      </button>
    </div>
  );
}