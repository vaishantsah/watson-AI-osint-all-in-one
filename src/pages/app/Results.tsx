import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CaretRight as ChevronRight, DownloadSimple as Download, Sparkle as Sparkles } from '@phosphor-icons/react'
import { BrandIcon } from '../../components/BrandIcon'
import { GlassLens } from '../../components/GlassLens'
import { detectKind, foundProfiles, type PlatformGroup } from '../../data/mock'
import { kindMeta } from './Search'

const stages = ['Checking social networks', 'Checking forums', 'Checking developer sites', 'Checking games and media', 'Putting it together']
const groups: ('All' | PlatformGroup)[] = ['All', 'Social', 'Dev', 'Gaming', 'Forums', 'Media']
const SITES = 3100

export default function Results() {
  const [params] = useSearchParams()
  const q = params.get('q') ?? 'johndoe_92'
  const meta = kindMeta[detectKind(q)]
  const [progress, setProgress] = useState(0)
  const [filter, setFilter] = useState<(typeof groups)[number]>('All')

  // Simulated scan so the prototype feels alive; replace with real job status later.
  useEffect(() => {
    setProgress(0)
    const t = setInterval(() => setProgress((p) => Math.min(100, p + 4)), 90)
    return () => clearInterval(t)
  }, [q])

  const done = progress >= 100
  const stage = Math.min(stages.length - 1, Math.floor(progress / (100 / stages.length)))
  const visible = foundProfiles.slice(0, Math.round((progress / 100) * foundProfiles.length))
  const list = visible.filter((p) => filter === 'All' || p.group === filter)
  const same = foundProfiles.filter((p) => p.match === 'exact').length

  return (
    <div className="mx-auto max-w-[760px] px-5 pb-16 pt-8">
      {/* Header */}
      <div className="flex items-center gap-5">
        <div className="-m-4 shrink-0">
          <GlassLens size={64} active={!done} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[13px] text-fog">
            <meta.icon className="size-3.5" /> {meta.label}
          </div>
          <h1 className="mt-0.5 break-all text-[28px] font-semibold leading-[1.2] tracking-[-0.02em]">{q}</h1>
        </div>
      </div>

      <p role="status" className="sr-only">
        {done ? `Found on ${foundProfiles.length} sites` : 'Searching'}
      </p>

      {/* Status */}
      {!done ? (
        <div className="mt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 text-[15px]">
            <span>{stages[stage]}…</span>
            <span className="tabular-nums text-fog">
              {Math.round((progress / 100) * SITES).toLocaleString('en-US')} of {SITES.toLocaleString('en-US')} sites
            </span>
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.08]">
            <div className="h-full rounded-full bg-gas-400 transition-[width] duration-200" style={{ width: `${progress}%` }} />
          </div>
        </div>
      ) : (
        <section className="animate-fade-up mt-8 rounded-2xl border border-transparent bg-ink-850 p-5 ring-1 ring-white/[0.06]">
          <h2 className="flex items-center gap-2 text-[13px] font-semibold text-gas-400">
            <Sparkles className="size-4" /> What Watson found
          </h2>
          <p className="mt-2.5 text-[17px] leading-[1.5] text-paper">
            This {meta.label.toLowerCase()} is used on <b className="font-semibold">{foundProfiles.length} public sites</b>.{' '}
            {same} of them look like the same person: same name, matching photos and links between profiles. The oldest
            account is from 2015, and they are most active on GitHub and Reddit.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <button className="flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[15px] font-medium text-black transition-colors hover:bg-white/85">
              <Download className="size-4" /> Save as PDF
            </button>
          </div>
        </section>
      )}

      {/* Filters: bleed to the window edge so a cut-off chip shows there is more. */}
      <div className="-mx-5 mt-8 overflow-x-auto px-5 py-1">
        <div className="inline-flex rounded-[10px] bg-white/[0.07] p-0.5" aria-label="Filter by type" role="group">
          {groups.map((g) => {
            const n = g === 'All' ? visible.length : visible.filter((p) => p.group === g).length
            const on = g === filter
            return (
              <button
                key={g}
                aria-pressed={on}
                onClick={() => setFilter(g)}
                className={`h-8 whitespace-nowrap rounded-[8px] px-3.5 text-[13px] font-medium transition-colors focus-visible:-outline-offset-3 ${
                  on ? 'bg-ink-600 text-paper shadow-[0_1px_3px_rgba(0,0,0,0.4)]' : 'text-fog hover:text-paper'
                }`}
              >
                {g} <span className="tabular-nums text-paper-dim">{n}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Grouped list */}
      {list.length > 0 && (
        <ul className="mt-4 overflow-hidden rounded-2xl border border-transparent bg-ink-850 ring-1 ring-white/[0.06]">
          {list.map((p, i) => (
            <li key={p.site} className={done ? undefined : 'animate-fade-up'}>
              <button className="group flex w-full items-center gap-3.5 px-4 py-3 text-left transition-colors hover:bg-white/[0.04] focus-visible:-outline-offset-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-white/[0.07] ring-1 ring-white/[0.06]">
                  <BrandIcon site={p.site} className="size-5 text-paper" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block break-words text-[15px] font-medium">{p.site}</span>
                  <span className="block break-words text-[13px] text-fog">
                    {p.detail}, since {p.since}
                  </span>
                </span>
                <span className={`shrink-0 text-[13px] ${p.match === 'exact' ? 'text-evidence' : 'text-fog'}`}>
                  {p.match === 'exact' ? 'Same person' : 'Name match'}
                </span>
                <ChevronRight className="size-4 shrink-0 text-fog transition-colors group-hover:text-paper" />
              </button>
              {i < list.length - 1 && <div className="ml-[70px] h-px bg-white/[0.07]" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
