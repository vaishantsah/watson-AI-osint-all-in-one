import { useState } from 'react'
import {
  Archive,
  Buildings,
  Code,
  HardDrives,
  IdentificationCard,
  Key as KeyRound,
  Plus,
  MagnifyingGlass as Search,
  ShieldWarning,
} from '@phosphor-icons/react'
import { tools, type Tool, type ToolCategory } from '../../data/mock'

const categoryIcon: Record<ToolCategory, typeof Code> = {
  Infrastructure: HardDrives,
  Identity: IdentificationCard,
  Corporate: Buildings,
  'Web & archive': Archive,
  'Threat intel': ShieldWarning,
  Code: Code,
}

const categories: ('All' | ToolCategory)[] = ['All', 'Infrastructure', 'Identity', 'Corporate', 'Web & archive', 'Threat intel', 'Code']

const status: Record<Tool['status'], { label: string; style: string }> = {
  connected: { label: 'Connected', style: 'text-evidence' },
  available: { label: 'Not connected', style: 'text-fog' },
  beta: { label: 'Beta', style: 'text-violet' },
}

export default function Toolkit() {
  const [cat, setCat] = useState<(typeof categories)[number]>('All')
  const [q, setQ] = useState('')
  const list = tools.filter((t) => (cat === 'All' || t.category === cat) && t.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="mx-auto max-w-6xl px-5 pb-16 pt-8 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[34px] font-semibold leading-[1.1] tracking-[-0.02em]">Sources</h1>
          <p className="mt-1 text-[15px] text-fog">
            {tools.filter((t) => t.status === 'connected').length} of {tools.length} sources connected. Watson picks the right
            ones for each search automatically.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-[13px] text-paper-dim hover:text-paper">
          <Plus className="size-4" /> Add custom source
        </button>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        <label className="mr-2 flex h-9 items-center gap-2 rounded-lg border border-white/[0.08] bg-ink-900 px-3 focus-within:ring-2 focus-within:ring-gas-400/70">
          <Search className="size-4 text-fog" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Filter sources by name"
            placeholder="Filter sources"
            className="w-36 bg-transparent text-[13px] outline-none placeholder:text-fog"
          />
        </label>
        <div role="group" aria-label="Category" className="flex flex-wrap gap-1">
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={c === cat}
              onClick={() => setCat(c)}
              className={`rounded-full px-3 py-1.5 text-[13px] transition-colors ${
                c === cat ? 'bg-white/15 text-paper' : 'text-fog hover:bg-white/5 hover:text-paper'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {list.length > 0 ? (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => {
            const Icon = categoryIcon[t.category]
            const s = status[t.status]
            return (
              <li key={t.name} className="hairline flex flex-col rounded-xl p-5">
                <div className="flex items-start justify-between">
                  <span className="grid size-10 place-items-center rounded-[10px] bg-white/[0.08] text-gas-400">
                    <Icon className="size-5" />
                  </span>
                  <span className={`flex items-center gap-1.5 text-[12px] ${s.style}`}>
                    <span className="size-1.5 rounded-full bg-current" /> {s.label}
                  </span>
                </div>
                <h2 className="mt-4 font-medium">{t.name}</h2>
                <p className="mt-1 flex-1 text-[13px] leading-snug text-fog">{t.description}</p>
                <div className="mt-4 flex items-center gap-2 border-t border-white/5 pt-3 text-[12px] text-fog">
                  <span>{t.category}</span>
                  {t.status === 'available' ? (
                    <button className="ml-auto flex items-center gap-1 rounded text-gas-300 hover:text-gas-400">
                      <KeyRound className="size-3.5" /> Connect
                    </button>
                  ) : (
                    <span className="ml-auto tabular-nums">{t.runs.toLocaleString('en-US')} runs</span>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <div className="mt-16 text-center">
          <p className="font-medium">No sources match “{q}”</p>
          <button
            onClick={() => {
              setQ('')
              setCat('All')
            }}
            className="mt-3 rounded-lg border border-white/10 px-3 py-2 text-[13px] text-paper-dim hover:text-paper"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
