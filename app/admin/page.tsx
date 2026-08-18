"use client";

import { useEffect, useState } from "react";
import type { SiteContent, Category, TermSection, Tier } from "@/lib/content";

const emptyTier = (): Tier => ({
  name: "Satuan",
  badge: "",
  qty: "1 desain",
  price: "Rp0",
  duration: "1-2 hari",
});

const emptyCategory = (): Category => ({
  id: `kategori-${Date.now()}`,
  title: "Kategori Baru",
  unit: "desain",
  notes: [],
  tiers: [emptyTier()],
});

const emptyTerm = (): TermSection => ({
  id: `syarat-${Date.now()}`,
  title: "Bagian Baru",
  items: [],
});

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const [content, setContent] = useState<SiteContent | null>(null);
  const [status, setStatus] = useState<{ type: "idle" | "ok" | "error"; msg: string }>({
    type: "idle",
    msg: "",
  });
  const [saving, setSaving] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setLoginError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      setAuthed(true);
    } else {
      const data = await res.json().catch(() => ({}));
      setLoginError(data.error || "Password salah.");
    }
  }

  useEffect(() => {
    if (!authed) return;
    fetch("/api/content")
      .then((r) => r.json())
      .then(setContent);
  }, [authed]);

  async function handleSave() {
    if (!content) return;
    setSaving(true);
    setStatus({ type: "idle", msg: "" });
    const res = await fetch("/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    if (res.ok) {
      setStatus({ type: "ok", msg: data.note || "Tersimpan." });
    } else {
      setStatus({ type: "error", msg: data.error || "Gagal menyimpan." });
    }
  }

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-paper px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-white/10 bg-navy p-8 shadow-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold">
            Admin Access
          </p>
          <h1 className="mt-3 font-display text-2xl font-semibold text-ink">
            Masuk ke Dashboard
          </h1>
          <input
            type="password"
            placeholder="Password admin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-6 w-full rounded-lg border border-white/20 bg-navy-light px-4 py-2.5 text-ink placeholder:text-ink/40 focus:border-gold outline-none transition-colors"
            autoFocus
          />
          {loginError && (
            <p className="mt-2 text-sm text-clay">{loginError}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full rounded-lg bg-gold px-4 py-2.5 font-medium text-navy transition hover:bg-gold-light disabled:opacity-60"
          >
            {loading ? "Memeriksa..." : "Masuk"}
          </button>
        </form>
      </main>
    );
  }

  if (!content) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-paper">
        <p className="font-mono text-sm text-ink/50">Memuat konten...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-paper pb-32">
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-paper/95 px-6 py-4 backdrop-blur shadow-sm">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-teal">
            Admin Dashboard
          </p>
          <h1 className="font-display text-xl font-semibold text-ink">
            Edit Konten Pricelist
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {status.type !== "idle" && (
            <span
              className={`max-w-xs text-xs font-medium ${
                status.type === "ok" ? "text-teal" : "text-clay"
              }`}
            >
              {status.msg}
            </span>
          )}
          <a
            href="/"
            target="_blank"
            className="rounded-full border border-white/20 px-4 py-2 font-mono text-xs text-ink/80 transition-colors hover:border-teal hover:text-teal"
          >
            Lihat Situs ↗
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-gold px-5 py-2 font-mono text-xs font-bold text-navy transition-colors hover:bg-gold-light disabled:opacity-60"
          >
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 pt-8">
        {/* Site info */}
        <Section title="Info Situs">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Nama Brand"
              value={content.site.brand}
              onChange={(v) =>
                setContent({ ...content, site: { ...content.site, brand: v } })
              }
            />
            <Field
              label="Pemilik / Studio"
              value={content.site.owner}
              onChange={(v) =>
                setContent({ ...content, site: { ...content.site, owner: v } })
              }
            />
            <Field
              label="Tahun"
              value={content.site.year}
              onChange={(v) =>
                setContent({ ...content, site: { ...content.site, year: v } })
              }
            />
            <Field
              label="Nomor WhatsApp (62xxxxxxxxxx)"
              value={content.site.whatsapp}
              onChange={(v) =>
                setContent({ ...content, site: { ...content.site, whatsapp: v } })
              }
            />
            <Field
              label="Instagram (tanpa @)"
              value={content.site.instagram}
              onChange={(v) =>
                setContent({ ...content, site: { ...content.site, instagram: v } })
              }
            />
            <Field
              label="TikTok (tanpa @)"
              value={content.site.tiktok || ""}
              onChange={(v) =>
                setContent({ ...content, site: { ...content.site, tiktok: v } })
              }
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 mt-4">
             <Field
                label="Link (Lynk.id/dst)"
                value={content.site.lynk || ""}
                onChange={(v) =>
                  setContent({ ...content, site: { ...content.site, lynk: v } })
                }
              />
              <Field
                label="Tagline"
                value={content.site.tagline}
                onChange={(v) =>
                  setContent({ ...content, site: { ...content.site, tagline: v } })
                }
              />
          </div>
          <Field
            label="Catatan di bawah navigasi (heroNote)"
            value={content.site.heroNote}
            onChange={(v) =>
              setContent({ ...content, site: { ...content.site, heroNote: v } })
            }
            className="mt-4"
          />
        </Section>

        {/* Categories */}
        <Section title="Kategori Desain & Harga">
          <div className="space-y-6">
            {content.categories.map((cat, i) => (
              <CategoryEditor
                key={cat.id}
                category={cat}
                onChange={(updated) => {
                  const next = [...content.categories];
                  next[i] = updated;
                  setContent({ ...content, categories: next });
                }}
                onDelete={() => {
                  const next = content.categories.filter((_, idx) => idx !== i);
                  setContent({ ...content, categories: next });
                }}
              />
            ))}
          </div>
          <button
            onClick={() =>
              setContent({
                ...content,
                categories: [...content.categories, emptyCategory()],
              })
            }
            className="mt-6 w-full rounded-xl border border-dashed border-teal/50 bg-teal/5 py-4 font-mono text-sm text-teal transition-colors hover:bg-teal/10 hover:border-teal"
          >
            + Tambah Kategori
          </button>
        </Section>

        {/* Terms */}
        <Section title="Syarat & Ketentuan">
          <div className="space-y-6">
            {content.terms.map((term, i) => (
              <TermEditor
                key={term.id}
                term={term}
                onChange={(updated) => {
                  const next = [...content.terms];
                  next[i] = updated;
                  setContent({ ...content, terms: next });
                }}
                onDelete={() => {
                  const next = content.terms.filter((_, idx) => idx !== i);
                  setContent({ ...content, terms: next });
                }}
              />
            ))}
          </div>
          <button
            onClick={() =>
              setContent({ ...content, terms: [...content.terms, emptyTerm()] })
            }
            className="mt-6 w-full rounded-xl border border-dashed border-gold/50 bg-gold/5 py-4 font-mono text-sm text-gold transition-colors hover:bg-gold/10 hover:border-gold"
          >
            + Tambah Syarat & Ketentuan
          </button>
        </Section>
      </div>
    </main>
  );
}

/* ---------- shared bits ---------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8 rounded-2xl border border-white/10 bg-navy p-6 shadow-xl">
      <h2 className="font-display text-xl font-semibold text-ink border-b border-white/10 pb-4">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wide text-ink/60">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-navy-light px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal focus:bg-white/5"
      />
    </label>
  );
}

function ListEditor({
  items,
  onChange,
  placeholder,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
}) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => {
              const next = [...items];
              next[i] = e.target.value;
              onChange(next);
            }}
            className="w-full rounded-lg border border-white/10 bg-navy-light px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-teal"
          />
          <button
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            className="flex w-10 items-center justify-center rounded-lg border border-white/10 bg-navy-light text-ink/50 transition-colors hover:border-clay hover:text-clay hover:bg-clay/10"
            aria-label="Hapus baris"
            type="button"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="inline-block rounded-lg px-3 py-1.5 font-mono text-xs text-ink/50 transition-colors hover:bg-white/5 hover:text-teal"
      >
        + {placeholder}
      </button>
    </div>
  );
}

/* ---------- category editor ---------- */

function CategoryEditor({
  category,
  onChange,
  onDelete,
}: {
  category: Category;
  onChange: (c: Category) => void;
  onDelete: () => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="grid flex-1 gap-4 sm:grid-cols-2">
          <Field
            label="Judul Kategori"
            value={category.title}
            onChange={(v) => onChange({ ...category, title: v })}
          />
          <Field
            label="Satuan (feed / slide / desain)"
            value={category.unit}
            onChange={(v) => onChange({ ...category, unit: v })}
          />
        </div>
        <button
          type="button"
          onClick={onDelete}
          className="mt-6 whitespace-nowrap rounded-lg border border-clay/30 px-3 py-2 font-mono text-xs text-clay transition-colors hover:bg-clay/10"
        >
          Hapus
        </button>
      </div>

      <div className="mt-6 rounded-lg bg-navy-light/50 p-4 border border-white/5">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-wide text-gold">
          Paket Harga
        </p>
        <div className="space-y-2">
          {category.tiers.map((tier, i) => (
            <div
              key={i}
              className="grid grid-cols-2 gap-2 rounded-lg border border-white/10 bg-navy p-2 sm:grid-cols-5"
            >
              <input
                value={tier.badge}
                onChange={(e) => {
                  const tiers = [...category.tiers];
                  tiers[i] = { ...tier, badge: e.target.value };
                  onChange({ ...category, tiers });
                }}
                placeholder="🥇 Emoji"
                className="rounded border border-white/5 bg-navy-light px-3 py-2 text-sm text-ink outline-none focus:border-teal"
              />
              <input
                value={tier.name}
                onChange={(e) => {
                  const tiers = [...category.tiers];
                  tiers[i] = { ...tier, name: e.target.value };
                  onChange({ ...category, tiers });
                }}
                placeholder="Nama paket"
                className="rounded border border-white/5 bg-navy-light px-3 py-2 text-sm text-ink outline-none focus:border-teal"
              />
              <input
                value={tier.qty}
                onChange={(e) => {
                  const tiers = [...category.tiers];
                  tiers[i] = { ...tier, qty: e.target.value };
                  onChange({ ...category, tiers });
                }}
                placeholder="Jumlah"
                className="rounded border border-white/5 bg-navy-light px-3 py-2 text-sm text-ink outline-none focus:border-teal"
              />
              <input
                value={tier.price}
                onChange={(e) => {
                  const tiers = [...category.tiers];
                  tiers[i] = { ...tier, price: e.target.value };
                  onChange({ ...category, tiers });
                }}
                placeholder="Rp0"
                className="rounded border border-white/5 bg-navy-light px-3 py-2 text-sm font-mono text-gold outline-none focus:border-teal"
              />
              <div className="flex gap-2">
                <input
                  value={tier.duration}
                  onChange={(e) => {
                    const tiers = [...category.tiers];
                    tiers[i] = { ...tier, duration: e.target.value };
                    onChange({ ...category, tiers });
                  }}
                  placeholder="1-2 hari"
                  className="w-full rounded border border-white/5 bg-navy-light px-3 py-2 text-sm text-ink outline-none focus:border-teal"
                />
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...category,
                      tiers: category.tiers.filter((_, idx) => idx !== i),
                    })
                  }
                  className="flex w-10 items-center justify-center rounded border border-white/5 bg-navy-light text-ink/50 transition-colors hover:border-clay hover:bg-clay/10 hover:text-clay"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            onChange({ ...category, tiers: [...category.tiers, emptyTier()] })
          }
          className="mt-3 inline-block rounded-lg px-3 py-1.5 font-mono text-xs text-teal transition-colors hover:bg-white/5"
        >
          + Tambah Paket
        </button>
      </div>

      <div className="mt-6">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-wide text-gold">
          Catatan & Syarat Khusus (Opsional)
        </p>
        <ListEditor
          items={category.notes}
          onChange={(notes) => onChange({ ...category, notes })}
          placeholder="Tambah catatan"
        />
      </div>
    </div>
  );
}

/* ---------- terms editor ---------- */

function TermEditor({
  term,
  onChange,
  onDelete,
}: {
  term: TermSection;
  onChange: (t: TermSection) => void;
  onDelete: () => void;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <div className="flex items-end justify-between gap-4">
        <Field
          label="Judul Aturan"
          value={term.title}
          onChange={(v) => onChange({ ...term, title: v })}
          className="flex-1"
        />
        <button
          type="button"
          onClick={onDelete}
          className="mb-0.5 whitespace-nowrap rounded-lg border border-clay/30 px-3 py-2 font-mono text-xs text-clay transition-colors hover:bg-clay/10"
        >
          Hapus Bagian
        </button>
      </div>
      <div className="mt-5 rounded-lg bg-navy-light/50 p-4 border border-white/5">
        <ListEditor
          items={term.items}
          onChange={(items) => onChange({ ...term, items })}
          placeholder="Tambah poin detail aturan"
        />
      </div>
    </div>
  );
}