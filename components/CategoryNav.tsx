import { Category } from "@/lib/content";

export default function CategoryNav({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <nav
      aria-label="Lompat ke kategori"
      className="sticky top-0 z-20 -mx-6 overflow-x-auto border-b border-ink/10 bg-paper/90 px-6 py-3 backdrop-blur"
    >
      <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
        {categories.map((c) => (
          <li key={c.id}>
            <a
              href={`#${c.id}`}
              className="block whitespace-nowrap rounded-full border border-ink/15 px-3.5 py-1.5 font-mono text-xs text-ink/70 transition hover:border-teal hover:text-teal"
            >
              {c.title}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#tnc"
            className="block whitespace-nowrap rounded-full border border-clay/30 bg-clay/5 px-3.5 py-1.5 font-mono text-xs text-clay transition hover:bg-clay/10"
          >
            Syarat &amp; Ketentuan
          </a>
        </li>
      </ul>
    </nav>
  );
}
