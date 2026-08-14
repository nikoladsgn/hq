import { TermSection } from "@/lib/content";

export default function TermsSection({ terms }: { terms: TermSection[] }) {
  return (
    <section id="tnc" className="scroll-mt-20 bg-navy py-16 text-paper">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-gold-light">
          <span className="h-px w-8 bg-gold-light/60" />
          Term &amp; Condition
        </div>
        <h2 className="mt-4 font-display text-3xl font-semibold italic sm:text-4xl">
          Syarat &amp; Ketentuan
        </h2>

        <div className="mt-8 space-y-4">
          {terms.map((section) => (
            <details
              key={section.id}
              className="group rounded-xl border border-paper/15 bg-paper/[0.04] px-5 py-4 open:bg-paper/[0.07]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg font-medium">
                {section.title}
                <span className="ml-4 font-mono text-gold-light transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <ul className="mt-3 space-y-2 border-t border-paper/10 pt-3 text-sm text-paper/75">
                {section.items.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-0.5 text-gold-light">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
