import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  CaretDown as ChevronDown,
  CaretRight as ChevronRight,
  ClockCounterClockwise as Clock,
  Folders as FolderSearch,
  List as Menu,
  MagnifyingGlass as Search,
  GearSix as Settings,
  Wrench,
  X,
} from '@phosphor-icons/react'
import { Logo } from '../../components/Logo'
import { cases } from '../../data/mock'

// Inside the desktop app the window has no native title bar, so our own
// toolbar doubles as the drag area and leaves room for the OS window controls.
const isDesktop = navigator.userAgent.includes('Electron')
const isMac = /Mac/.test(navigator.platform)

type NavItem = { to: string; label: string; icon: typeof Search; end?: boolean }

const nav: NavItem[] = [
  { to: '/app', label: 'Search', icon: Search, end: true },
  { to: '/app/history', label: 'History', icon: Clock },
]

const advanced: NavItem[] = [
  { to: '/app/cases/WT-1042', label: 'Cases', icon: FolderSearch },
  { to: '/app/toolkit', label: 'Sources', icon: Wrench },
]

// The toolbar shows a title only where the page itself doesn't lead with one.
const titles: [RegExp, string, boolean][] = [
  [/^\/app\/?$/, 'Search', false],
  [/^\/app\/results/, 'Results', true],
  [/^\/app\/history/, 'History', false],
  [/^\/app\/cases/, 'Case', true],
  [/^\/app\/toolkit/, 'Sources', false],
]

export default function AppLayout() {
  const [open, setOpen] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(true)
  const [palette, setPalette] = useState(false)
  const { pathname } = useLocation()
  const [, title, showTitle] = titles.find(([re]) => re.test(pathname)) ?? [null, '', false]

  useEffect(() => {
    document.title = title ? `${title} - Watson` : 'Watson'
  }, [title])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPalette((p) => !p)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="flex h-dvh overflow-hidden bg-ink-950 text-paper">
      {/* Sidebar */}
      <aside
        className={`material fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-white/[0.06] motion-safe:transition-transform lg:static lg:visible lg:translate-x-0 ${
          open ? 'translate-x-0' : 'max-lg:invisible -translate-x-full'
        }`}
      >
        <div className={`drag flex h-[52px] shrink-0 items-center justify-between pr-3 ${isDesktop && isMac ? 'pl-20' : 'pl-4'}`}>
          <Link to="/app" className="no-drag rounded-md">
            <Logo size={22} />
          </Link>
          <button className="no-drag text-fog lg:hidden" onClick={() => setOpen(false)} aria-label="Close sidebar">
            <X className="size-4" />
          </button>
        </div>

        <nav aria-label="Main" className="mt-2 space-y-px px-2.5">
          {nav.map((n) => (
            <SideLink key={n.label} item={n} onClick={() => setOpen(false)} />
          ))}
        </nav>

        <button
          onClick={() => setShowAdvanced((v) => !v)}
          aria-expanded={showAdvanced}
          aria-controls="nav-advanced"
          className="mx-2.5 mt-6 flex items-center gap-1 rounded-md px-2.5 py-1 text-[12px] font-semibold text-fog hover:text-paper"
        >
          Advanced
          {showAdvanced ? <ChevronDown className="size-3" /> : <ChevronRight className="size-3" />}
        </button>
        {showAdvanced && (
          <nav id="nav-advanced" aria-label="Advanced" className="mt-1 space-y-px px-2.5">
            {advanced.map((n) => (
              <SideLink key={n.label} item={n} onClick={() => setOpen(false)} />
            ))}
          </nav>
        )}

        <div className="mt-auto space-y-1 p-2.5">
          <p className="px-2.5 pb-1 text-[12px] leading-snug text-fog">Free forever. No account needed.</p>
          <button className="flex h-8 w-full items-center gap-2.5 rounded-lg px-2.5 text-[14px] text-paper-dim transition-colors hover:bg-white/[0.05]">
            <Settings className="size-4 text-fog" /> Settings
          </button>
        </div>
      </aside>
      {open && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header
          className={`drag flex h-[52px] shrink-0 items-center gap-3 pl-4 ${isDesktop && !isMac ? 'pr-[150px]' : 'pr-4'} ${
            showTitle ? 'border-b border-white/[0.06]' : ''
          }`}
        >
          <button
            className="no-drag text-fog lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open sidebar"
            aria-expanded={open}
          >
            <Menu className="size-5" />
          </button>
          {showTitle && <div className="text-[15px] font-semibold">{title}</div>}
          <button
            onClick={() => setPalette(true)}
            aria-label="Quick find"
            aria-keyshortcuts={isMac ? 'Meta+K' : 'Control+K'}
            className="no-drag ml-auto flex h-8 items-center gap-2 rounded-lg bg-white/[0.06] px-2.5 text-[13px] text-fog transition-colors hover:bg-white/10 hover:text-paper"
          >
            <Search className="size-3.5" />
            <span className="hidden sm:inline">Quick find</span>
            <kbd className="hidden font-sans text-[11px] sm:inline">{isMac ? 'Cmd K' : 'Ctrl K'}</kbd>
          </button>
        </header>

        <main className="scrollbar-thin flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {palette && <QuickFind onClose={() => setPalette(false)} />}
    </div>
  )
}

function SideLink({ item, onClick }: { item: NavItem; onClick: () => void }) {
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onClick}
      className={({ isActive }) =>
        `flex h-8 items-center gap-2.5 rounded-lg px-2.5 text-[14px] transition-colors ${
          isActive ? 'bg-white/10 text-paper' : 'text-paper-dim hover:bg-white/[0.05]'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <item.icon className={`size-4 ${isActive ? 'text-gas-400' : 'text-fog'}`} />
          {item.label}
        </>
      )}
    </NavLink>
  )
}

function QuickFind({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  // A native modal dialog traps focus, closes on Escape and hands focus back.
  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null
    ref.current?.showModal()
    return () => trigger?.focus()
  }, [])

  const groups = [
    {
      h: 'Recent searches',
      items: ['johndoe_92', 'acme-logistics.com', 'Northwind Holdings Ltd'].map((q) => ({
        label: q,
        to: `/app/results?q=${encodeURIComponent(q)}`,
      })),
    },
    { h: 'Cases', items: cases.slice(0, 3).map((c) => ({ label: c.title, to: `/app/cases/${c.id}` })) },
  ]

  return (
    <dialog
      ref={ref}
      aria-label="Quick find"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="material animate-fade-up mx-auto mt-[14vh] w-[calc(100%-2rem)] max-w-xl overflow-hidden rounded-2xl p-0 text-paper shadow-2xl shadow-black ring-1 ring-white/10 backdrop:bg-black/50"
    >
      <div className="m-2 flex items-center gap-3 rounded-xl px-2 py-1.5 focus-within:ring-2 focus-within:ring-gas-400/70">
        <Search className="size-5 text-fog" />
        <input
          autoFocus
          aria-label="Search history and cases"
          placeholder="Search history and cases"
          className="h-9 flex-1 bg-transparent text-[17px] outline-none placeholder:text-fog"
        />
      </div>
      <div className="max-h-80 overflow-y-auto overscroll-contain border-t border-white/[0.06] p-2">
        {groups.map((g) => (
          <section key={g.h} className="mb-1">
            <h2 className="px-3 pb-1 pt-2 text-[12px] font-semibold text-fog">{g.h}</h2>
            {g.items.map((it) => (
              <Link
                key={it.to}
                to={it.to}
                onClick={onClose}
                className="block rounded-lg px-3 py-2 text-[14px] text-paper-dim hover:bg-white/[0.06] hover:text-paper focus-visible:-outline-offset-3"
              >
                {it.label}
              </Link>
            ))}
          </section>
        ))}
      </div>
    </dialog>
  )
}
