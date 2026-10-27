import { Link } from 'react-router-dom'
import { CaretRight as ChevronRight } from '@phosphor-icons/react'
import { detectKind, searchProfiles } from '../../data/mock'
import { kindMeta } from './Search'

const history = [
  {
    day: 'Today',
    items: [
      { q: 'johndoe_92', time: '14:32' },
      { q: 'acme-logistics.com', time: '11:05' },
    ],
  },
  {
    day: 'Yesterday',
    items: [
      { q: 'Northwind Holdings Ltd', time: '18:47' },
      { q: 'billing@contoso.io', time: '09:12' },
    ],
  },
  {
    day: 'Last week',
    items: [
      { q: '+44 20 7946 0958', time: 'Oct 21' },
      { q: 'night_owl', time: 'Oct 20' },
      { q: 'globex.com', time: 'Oct 19' },
    ],
  },
]

export default function History() {
  return (
    <div className="mx-auto max-w-[760px] px-5 pb-16 pt-8">
      <h1 className="text-[34px] font-semibold leading-[1.1] tracking-[-0.02em]">History</h1>
      <p className="mt-1 text-[15px] text-fog">Everything you’ve looked up. Saved only on this computer.</p>

      {history.map((g) => (
        <section key={g.day} className="mt-8">
          <h2 className="px-4 text-[13px] font-semibold text-fog">{g.day}</h2>
          <ul className="mt-2 overflow-hidden rounded-2xl border border-transparent bg-ink-850 ring-1 ring-white/[0.06]">
            {g.items.map((it, i) => {
              const m = kindMeta[detectKind(it.q)]
              const found = searchProfiles(it.q).length
              return (
                <li key={it.q}>
                  <Link
                    to={`/app/results?q=${encodeURIComponent(it.q)}`}
                    className="group flex items-center gap-3.5 px-4 py-3 transition-colors hover:bg-white/[0.04] focus-visible:-outline-offset-3"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-[9px] bg-white/[0.08] text-gas-400">
                      <m.icon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block break-all text-[15px] font-medium">{it.q}</span>
                      <span className="block text-[13px] text-fog">
                        {m.label}, {found ? `found on ${found} ${found === 1 ? 'site' : 'sites'}` : 'nothing found'}
                      </span>
                    </span>
                    <span className="shrink-0 text-[13px] tabular-nums text-fog">{it.time}</span>
                    <ChevronRight className="size-4 shrink-0 text-fog group-hover:text-paper" />
                  </Link>
                  {i < g.items.length - 1 && <div className="ml-[66px] h-px bg-white/[0.07]" />}
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}
