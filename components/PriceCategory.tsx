import { Category } from "@/lib/content";

export default function PriceCategory({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  return (
    <section id={category.id} className="scroll-mt-20 py-10">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-teal">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          {category.title}
        </h2>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_1px_0_rgba(0,0,0,0.03)]">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-navy text-paper">
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider sm:px-6">
                Paket
              </th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider sm:px-6">
                Jumlah
              </th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider sm:px-6">
                Harga
              </th>
              <th className="hidden px-4 py-3 font-mono text-xs uppercase tracking-wider sm:table-cell sm:px-6">
                Pengerjaan
              </th>
            </tr>
          </thead>
          <tbody>
            {category.tiers.map((tier, i) => (
              <tr
                key={tier.name + i}
                className={
                  i % 2 === 0 ? "bg-paper/40" : "bg-white"
                }
              >
                <td className="px-4 py-3.5 font-semibold text-ink sm:px-6">
                  <span className="mr-1.5">{tier.badge}</span>
                  {tier.name}
                </td>
                <td className="px-4 py-3.5 text-ink/70 sm:px-6">{tier.qty}</td>
                <td className="px-4 py-3.5 font-mono font-semibold text-teal sm:px-6">
                  {tier.price}
                </td>
                <td className="hidden px-4 py-3.5 text-ink/60 sm:table-cell sm:px-6">
                  {tier.duration}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {category.notes?.length > 0 && (
        <div className="mt-4 rounded-xl border border-dashed border-ink/15 bg-white/60 px-5 py-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-ink/40">
            Note
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-ink/70">
            {category.notes.map((n, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-gold-dark">·</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
