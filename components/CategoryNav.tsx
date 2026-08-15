"use client";
import React from 'react';

export default function CategoryNav({ categories }: { categories: any[] }) {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-4 z-50 mb-8 mt-8 flex flex-wrap justify-center gap-2 rounded-2xl border border-white/10 bg-navy/80 p-2 backdrop-blur-md shadow-lg">
      {categories.map((cat: any) => (
        <button
          key={cat.id}
          onClick={() => handleScroll(cat.id)}
          className="rounded-xl px-4 py-2 text-xs font-semibold tracking-wide text-ink/80 transition-all hover:bg-gold hover:text-navy"
        >
          {cat.title}
        </button>
      ))}
    </div>
  );
}