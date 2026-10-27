import { Link } from 'react-router-dom'
import { ArrowLeft } from '@phosphor-icons/react'
import { Logo, LogoMark } from '../components/Logo'

const colors = [
  { name: 'Ink 950', hex: '#08090A', cls: 'bg-ink-950', note: 'Background' },
  { name: 'Ink 850', hex: '#131417', cls: 'bg-ink-850', note: 'Surfaces' },
  { name: 'Paper', hex: '#EDE6D6', cls: 'bg-paper', note: 'Primary text' },
  { name: 'Fog', hex: '#8A8F98', cls: 'bg-fog', note: 'Secondary text' },
  { name: 'Gaslight', hex: '#F2B544', cls: 'bg-gas-400', note: 'Brand accent' },
  { name: 'Ember', hex: '#FF7A45', cls: 'bg-ember', note: 'Gradient end' },
  { name: 'Evidence', hex: '#86EFAC', cls: 'bg-evidence', note: 'Success' },
  { name: 'Risk', hex: '#FF6B6B', cls: 'bg-risk', note: 'High risk' },
]

export default function Brand() {
  return (
    <div className="grain mx-auto max-w-6xl px-4 py-12 sm:px-8">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-fog hover:text-paper">
        <ArrowLeft className="size-4" /> Back
      </Link>
      <h1 className="mt-8 text-5xl font-medium tracking-tight">
        Brand <span className="font-serif font-normal italic text-gas">guidelines</span>
      </h1>
      <p className="mt-4 max-w-2xl text-fog">
        The mark is a magnifying lens whose W is drawn as a five-node evidence graph: classic deduction meets modern
        link analysis. Gaslight amber nods to Victorian London; the dark ink canvas keeps the focus on the evidence.
      </p>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        <div className="hairline grid aspect-[4/3] place-items-center rounded-2xl md:col-span-2">
          <Logo size={72} />
        </div>
        <div className="grid gap-4">
          <div className="hairline grid place-items-center rounded-2xl py-10">
            <LogoMark size={88} />
          </div>
          <div className="grid place-items-center rounded-2xl bg-paper py-10">
            <span className="grid size-20 place-items-center rounded-[22px] bg-ink-950">
              <LogoMark size={52} />
            </span>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-sm uppercase tracking-[0.2em] text-smoke">Color</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {colors.map((c) => (
            <div key={c.name} className="hairline overflow-hidden rounded-xl">
              <div className={`h-24 ${c.cls} border-b border-paper/5`} />
              <div className="p-3">
                <div className="text-sm">{c.name}</div>
                <div className="mt-0.5 flex justify-between font-mono text-[11px] text-smoke">
                  <span>{c.hex}</span>
                  <span>{c.note}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-4 md:grid-cols-3">
        {[
          { name: 'Instrument Serif', use: 'Display accents, italics', cls: 'font-serif italic text-5xl' },
          { name: 'Geist', use: 'Headlines & interface', cls: 'font-sans text-4xl font-medium tracking-tight' },
          { name: 'Geist Mono', use: 'Entities, data, logs', cls: 'font-mono text-3xl' },
        ].map((f) => (
          <div key={f.name} className="hairline rounded-2xl p-6">
            <div className={`${f.cls} text-paper`}>Aa Elementary</div>
            <div className="mt-6 text-sm">{f.name}</div>
            <div className="text-xs text-smoke">{f.use}</div>
          </div>
        ))}
      </section>

      <section className="mt-16 grid gap-4 md:grid-cols-2">
        <div className="hairline rounded-2xl p-6">
          <h3 className="text-sm text-paper">Voice</h3>
          <p className="mt-2 text-sm text-fog">
            Calm, precise, quietly witty. Watson is the trusted assistant, never the hero. We cite sources, avoid hype and
            never imply access to anything non-public.
          </p>
        </div>
        <div className="hairline rounded-2xl p-6">
          <h3 className="text-sm text-paper">Taglines</h3>
          <ul className="mt-2 space-y-1 font-serif text-xl italic text-paper-dim">
            <li>The investigator’s assistant.</li>
            <li>Elementary, at scale.</li>
            <li>You see. Watson observes.</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
