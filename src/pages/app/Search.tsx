import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowUp,
  At as AtSign,
  Buildings as Building2,
  Globe,
  LockSimple as Lock,
  Envelope as Mail,
  Phone,
  MagnifyingGlass as SearchIcon,
} from '@phosphor-icons/react'
import { GlassLens } from '../../components/GlassLens'
import { detectKind, type SearchKind } from '../../data/mock'

export const kindMeta: Record<SearchKind, { label: string; icon: typeof AtSign; hint: string }> = {
  username: { label: 'Nickname', icon: AtSign, hint: 'johndoe_92' },
  email: { label: 'Email', icon: Mail, hint: 'name@company.com' },
  phone: { label: 'Phone', icon: Phone, hint: '+44 20 7946 0958' },
  domain: { label: 'Website', icon: Globe, hint: 'acme-logistics.com' },
  company: { label: 'Company', icon: Building2, hint: 'Northwind Holdings Ltd' },
}

const examples: [SearchKind, string][] = [
  ['username', 'Try a nickname'],
  ['email', 'Try an email'],
  ['phone', 'Try a phone number'],
  ['domain', 'Try a website'],
]

export default function Search() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const kind = q.trim() ? detectKind(q) : null
  const meta = kind ? kindMeta[kind] : null

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (q.trim()) navigate(`/app/results?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <div className="relative flex min-h-full flex-col items-center px-5 pb-10">
      <div className="flex w-full max-w-[640px] flex-1 flex-col items-center justify-center pt-6">
        <div className="animate-fade-up">
          <GlassLens size={132} />
        </div>

        <h1 className="mt-6 text-balance text-center text-[34px] font-semibold leading-[1.1] tracking-[-0.02em]">
          Find anyone’s public footprint
        </h1>
        <p className="mt-3 text-center text-[17px] text-fog">Enter a nickname, email, phone number or website.</p>

        <form onSubmit={submit} className="mt-9 w-full">
          <label className="group flex h-[60px] items-center gap-3 rounded-full bg-ink-850 pl-5 pr-2 ring-1 ring-white/[0.08] transition focus-within:ring-2 focus-within:ring-gas-400/70 has-[input:focus]:bg-ink-800">
            <SearchIcon className="size-5 shrink-0 text-fog" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="e.g. johndoe_92"
              aria-label="What to search for"
              className="h-full min-w-0 flex-1 bg-transparent text-[17px] outline-none placeholder:text-fog"
            />
            {meta && (
              <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-white/[0.08] px-2.5 py-1 text-[13px] text-paper-dim sm:flex">
                <meta.icon className="size-3.5 text-gas-400" />
                {meta.label}
              </span>
            )}
            <button
              type="submit"
              disabled={!q.trim()}
              aria-label="Search"
              className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-black transition hover:bg-white/85 disabled:bg-white/[0.08] disabled:text-smoke"
            >
              <ArrowUp className="size-5" />
            </button>
          </label>
        </form>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {examples.map(([k, text]) => {
            const m = kindMeta[k]
            return (
              <button
                key={k}
                onClick={() => setQ(m.hint)}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] text-fog ring-1 ring-white/[0.08] transition hover:bg-white/[0.05] hover:text-paper"
              >
                <m.icon className="size-3.5" />
                {text}
              </button>
            )
          })}
        </div>
      </div>

      <p className="flex items-center gap-1.5 text-center text-[13px] text-fog">
        <Lock className="size-3 shrink-0" /> Free, no account. Watson only looks at public information, and your searches stay on this computer.
      </p>
    </div>
  )
}
