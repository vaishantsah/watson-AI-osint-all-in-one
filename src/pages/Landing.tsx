import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  Check,
  FileText,
  Fingerprint,
  LockSimple as Lock,
  Quotes as MessageSquareQuote,
  Graph as Network,
  Scroll as ScrollText,
  MagnifyingGlass as Search,
  ShieldCheck,
  Sparkle as Sparkles,
  TerminalWindow as TerminalSquare,
  Users,
} from '@phosphor-icons/react'
import { Logo, LogoMark } from '../components/Logo'
import { EvidenceGraph } from '../components/EvidenceGraph'
import { agentSteps, caseGraph, tools } from '../data/mock'

const nav = ['Product', 'Toolkit', 'Use cases', 'Security', 'Pricing']

export default function Landing() {
  return (
    <div className="grain relative overflow-x-clip">
      <Header />
      <Hero />
      <ToolMarquee />
      <HowItWorks />
      <Bento />
      <UseCases />
      <Security />
      <Pricing />
      <FinalCta />
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-paper/5 bg-ink-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/">
          <Logo size={26} />
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-fog md:flex">
          {nav.map((n) => (
            <a key={n} href={`#${n.toLowerCase().replace(' ', '-')}`} className="transition hover:text-paper">
              {n}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/app"
            className="rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink-950 transition hover:bg-white"
          >
            Download free
          </Link>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative pt-36 pb-24 sm:pt-44">
      {/* Gaslight glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[720px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(242,181,68,0.18),transparent)]" />
      <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
        <a
          href="#product"
          className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-paper/10 bg-ink-850/60 py-1 pl-1 pr-3 text-xs text-paper-dim backdrop-blur transition hover:border-gas-400/40"
        >
          <span className="rounded-full bg-gas-400/15 px-2 py-0.5 font-medium text-gas-300">New</span>
          Watson Agents: 60+ open-source tools, one analyst
          <ArrowRight className="size-3" />
        </a>

        <h1 className="animate-fade-up mx-auto mt-8 max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.04em] [animation-delay:80ms] sm:text-7xl lg:text-[96px]">
          <span className="text-gradient">The investigator's</span>
          <br />
          <span className="font-serif text-[1.12em] font-normal italic tracking-[-0.02em] text-gas">assistant.</span>
        </h1>

        <p className="animate-fade-up mx-auto mt-7 max-w-2xl text-base leading-relaxed text-fog [animation-delay:160ms] sm:text-lg">
          Watson orchestrates battle-tested open-source intelligence tools, connects every trace into a living evidence
          graph and writes the case file, with a source behind every claim.
        </p>

        <div className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-3 [animation-delay:240ms] sm:flex-row">
          <Link
            to="/app"
            className="group inline-flex items-center gap-2 rounded-full bg-gas-400 px-6 py-3 text-sm font-medium text-ink-950 shadow-[0_0_40px_-8px_var(--color-gas-400)] transition hover:bg-gas-300"
          >
            Start an investigation
            <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
          </Link>
          <a
            href="#product"
            className="inline-flex items-center gap-2 rounded-full border border-paper/10 px-6 py-3 text-sm text-paper-dim transition hover:border-paper/25 hover:text-paper"
          >
            Watch the 2-min demo
          </a>
        </div>

        <HeroMockup />
      </div>
    </section>
  )
}

function HeroMockup() {
  return (
    <div className="animate-fade-up relative mx-auto mt-20 max-w-6xl [animation-delay:360ms]" id="product">
      <div className="absolute -inset-x-10 -top-10 bottom-0 rounded-[40px] bg-[radial-gradient(closest-side,rgba(242,181,68,0.12),transparent)] blur-2xl" />
      <div className="hairline relative overflow-hidden rounded-2xl text-left shadow-2xl shadow-black/60">
        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-paper/5 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-paper/10" />
            <span className="size-2.5 rounded-full bg-paper/10" />
            <span className="size-2.5 rounded-full bg-paper/10" />
          </div>
          <div className="mx-auto flex items-center gap-2 rounded-md bg-ink-950/60 px-3 py-1 font-mono text-[11px] text-smoke">
            <Lock className="size-3" /> app.watson.ai/cases/WT-1042
          </div>
        </div>

        <div className="grid min-h-[480px] md:grid-cols-[320px_1fr]">
          {/* Agent thread */}
          <div className="hidden border-r border-paper/5 p-4 md:block">
            <div className="rounded-xl border border-paper/8 bg-ink-950/50 p-3 text-[13px] text-paper-dim">
              Map the external attack surface of <span className="text-paper">acme-logistics.com</span> before we onboard
              them as a vendor.
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-fog">
              <LogoMark size={16} /> Watson is investigating
              <span className="ml-auto font-mono text-[10px] text-smoke">6 / 9 tools</span>
            </div>
            <ol className="mt-3 space-y-2.5">
              {agentSteps.slice(0, 5).map((s, i) => (
                <li key={s.tool} className="flex gap-2.5">
                  <span className="mt-1 grid size-4 shrink-0 place-items-center rounded-full bg-evidence/15">
                    <Check className="size-2.5 text-evidence" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-mono text-[11px] text-paper/80">{s.tool}</div>
                    <div className={`text-[11px] leading-snug text-smoke ${i > 2 ? 'line-clamp-1' : 'line-clamp-2'}`}>{s.text}</div>
                  </div>
                </li>
              ))}
              <li className="flex items-center gap-2.5">
                <span className="relative grid size-4 place-items-center">
                  <span className="absolute size-4 rounded-full bg-gas-400/30 animate-ping-slow" />
                  <span className="size-2 rounded-full bg-gas-400" />
                </span>
                <span className="font-mono text-[11px] text-gas-300">GitHub Code Search…</span>
              </li>
            </ol>
          </div>

          {/* Graph */}
          <div className="dot-grid relative min-h-[420px] overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gas-400/60 to-transparent animate-scan" />
            <div className="absolute left-4 top-4 z-10 flex gap-2">
              {['Graph', 'Timeline', 'Map'].map((t, i) => (
                <span
                  key={t}
                  className={`rounded-md px-2.5 py-1 text-[11px] ${i === 0 ? 'bg-paper/10 text-paper' : 'text-smoke'}`}
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="absolute inset-8 top-14">
              <EvidenceGraph nodes={caseGraph.nodes} edges={caseGraph.edges} compact />
            </div>

            {/* Floating finding */}
            <div className="absolute bottom-4 right-4 hidden w-72 rounded-xl border border-risk/25 bg-ink-900/90 p-3.5 backdrop-blur lg:block">
              <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-risk">
                <span className="size-1.5 rounded-full bg-risk" /> High-risk finding
              </div>
              <p className="mt-1.5 text-[13px] leading-snug text-paper">
                VPN gateway exposed with a role mailbox present in a 2024 breach corpus.
              </p>
              <div className="mt-2.5 flex gap-1.5 font-mono text-[10px] text-smoke">
                <span className="rounded bg-paper/5 px-1.5 py-0.5">[1] crt.sh</span>
                <span className="rounded bg-paper/5 px-1.5 py-0.5">[2] HIBP</span>
                <span className="rounded bg-paper/5 px-1.5 py-0.5">[3] Amass</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ToolMarquee() {
  const names = tools.map((t) => t.name)
  return (
    <section className="border-y border-paper/5 py-10">
      <p className="text-center text-xs uppercase tracking-[0.2em] text-smoke">
        Built on open-source tools the security community already trusts
      </p>
      <div className="mask-fade-x mt-7 overflow-hidden">
        <div className="flex w-max animate-marquee gap-12">
          {[...names, ...names].map((n, i) => (
            <span key={i} className="whitespace-nowrap font-mono text-sm text-fog/70">
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function SectionHead({ eyebrow, title, accent, text }: { eyebrow: string; title: string; accent: string; text?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="font-mono text-xs uppercase tracking-[0.2em] text-gas-400">{eyebrow}</div>
      <h2 className="mt-4 text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl">
        <span className="text-gradient">{title}</span>{' '}
        <span className="font-serif font-normal italic text-paper">{accent}</span>
      </h2>
      {text && <p className="mx-auto mt-5 max-w-xl text-fog">{text}</p>}
    </div>
  )
}

function HowItWorks() {
  const steps = [
    {
      n: '01',
      icon: Search,
      title: 'Ask in plain language',
      text: 'Name a domain, company, handle or IP and declare the purpose. Watson plans which sources are relevant.',
    },
    {
      n: '02',
      icon: TerminalSquare,
      title: 'Watson runs the toolkit',
      text: 'Agents chain SpiderFoot, Amass, theHarvester and dozens more, pivoting on every new lead, in parallel.',
    },
    {
      n: '03',
      icon: ScrollText,
      title: 'Receive the case file',
      text: 'A deduplicated evidence graph and a written brief, every sentence footnoted back to its raw source.',
    },
  ]
  return (
    <section className="py-28" id="how">
      <SectionHead eyebrow="How it works" title="From one clue to" accent="the whole picture." />
      <div className="mx-auto mt-16 grid max-w-6xl gap-4 px-4 sm:px-6 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="hairline group rounded-2xl p-7">
            <div className="flex items-center justify-between">
              <span className="grid size-10 place-items-center rounded-xl border border-paper/10 bg-ink-950/60 text-gas-400">
                <s.icon className="size-5" />
              </span>
              <span className="font-mono text-xs text-smoke">{s.n}</span>
            </div>
            <h3 className="mt-8 text-lg font-medium text-paper">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fog">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Bento() {
  return (
    <section className="py-12" id="toolkit">
      <SectionHead
        eyebrow="Product"
        title="Sixty tools."
        accent="One mind."
        text="Stop juggling terminals, API keys and spreadsheets. Watson turns a pile of open-source utilities into one calm workspace."
      />
      <div className="mx-auto mt-16 grid max-w-6xl gap-4 px-4 sm:px-6 md:grid-cols-6">
        {/* Evidence graph */}
        <div className="hairline relative overflow-hidden rounded-2xl md:col-span-4 md:row-span-2">
          <div className="p-7">
            <Network className="size-5 text-gas-400" />
            <h3 className="mt-4 text-xl font-medium">Living evidence graph</h3>
            <p className="mt-2 max-w-md text-sm text-fog">
              Every entity Watson touches lands on one canvas, merged, scored for risk and linked by the tool that
              proved the connection.
            </p>
          </div>
          <div className="dot-grid relative h-80 border-t border-paper/5">
            <div className="absolute inset-6">
              <EvidenceGraph nodes={caseGraph.nodes} edges={caseGraph.edges} compact showEdgeLabels selected="mail" />
            </div>
          </div>
        </div>

        {/* Run log */}
        <div className="hairline overflow-hidden rounded-2xl p-7 md:col-span-2">
          <TerminalSquare className="size-5 text-gas-400" />
          <h3 className="mt-4 text-lg font-medium">Transparent agent log</h3>
          <p className="mt-2 text-sm text-fog">See every command, query and pivot. No black boxes.</p>
          <div className="mt-5 space-y-1.5 rounded-lg bg-ink-950/70 p-3 font-mono text-[11px]">
            <div className="text-smoke">$ amass enum -passive -d acme…</div>
            <div className="text-evidence">23 hosts in 8.4s</div>
            <div className="text-smoke">$ harvester -d acme… -b all</div>
            <div className="text-evidence">6 emails in 5.2s</div>
            <div className="text-gas-300">pivot: it-ops@acme...</div>
          </div>
        </div>

        {/* Citations */}
        <div className="hairline rounded-2xl p-7 md:col-span-2">
          <MessageSquareQuote className="size-5 text-gas-400" />
          <h3 className="mt-4 text-lg font-medium">Cited, not hallucinated</h3>
          <p className="mt-2 text-sm text-fog">
            Every claim in the brief links to the raw artefact: certificate, snapshot or registry record
            <sup className="ml-0.5 font-mono text-gas-400">[3]</sup>.
          </p>
        </div>

        {[
          { icon: Bell, title: 'Continuous monitors', text: 'Re-run any case on a schedule and get alerted when the footprint changes.' },
          { icon: Users, title: 'No account, ever', text: 'Open the app and search. No sign-up, no email, no password.' },
          { icon: FileText, title: 'One-click reports', text: 'Export branded PDF, STIX 2.1 or JSON for your SIEM and stakeholders.' },
        ].map((f) => (
          <div key={f.title} className="hairline rounded-2xl p-7 md:col-span-2">
            <f.icon className="size-5 text-gas-400" />
            <h3 className="mt-4 text-lg font-medium">{f.title}</h3>
            <p className="mt-2 text-sm text-fog">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const useCases = [
  {
    key: 'Threat intelligence',
    title: 'Map attacker infrastructure in minutes, not days.',
    points: ['Pivot from one IOC to the whole cluster', 'Enrich with passive DNS, certificates and scan data', 'Export STIX bundles straight to your SIEM'],
    metric: ['14x', 'faster infrastructure mapping'],
  },
  {
    key: 'Attack surface',
    title: 'Know what the internet knows about you.',
    points: ['Continuous discovery of subdomains and exposed services', 'Shadow IT and forgotten staging hosts surfaced', 'Alerts when new assets appear'],
    metric: ['3,400+', 'assets tracked per org on average'],
  },
  {
    key: 'KYB & due diligence',
    title: 'Vet vendors and partners before you sign.',
    points: ['Registry, ownership and LEI chains across 140+ jurisdictions', 'Adverse media and domain history', 'Audit-ready brief for compliance teams'],
    metric: ['-82%', 'time per vendor review'],
  },
  {
    key: 'Brand protection',
    title: 'Catch lookalikes before your customers do.',
    points: ['Typosquat and homoglyph domain monitoring', 'Phishing page screenshots via urlscan', 'Takedown-ready evidence packs'],
    metric: ['<10 min', 'from registration to alert'],
  },
]

function UseCases() {
  const [active, setActive] = useState(0)
  const uc = useCases[active]
  return (
    <section className="py-28" id="use-cases">
      <SectionHead eyebrow="Use cases" title="Built for teams who" accent="need to know." />
      <div className="mx-auto mt-12 max-w-5xl px-4 sm:px-6">
        <div className="flex flex-wrap justify-center gap-2">
          {useCases.map((u, i) => (
            <button
              key={u.key}
              onClick={() => setActive(i)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                i === active ? 'border-gas-400/50 bg-gas-400/10 text-gas-300' : 'border-paper/10 text-fog hover:text-paper'
              }`}
            >
              {u.key}
            </button>
          ))}
        </div>
        <div key={uc.key} className="hairline animate-fade-up mt-8 grid gap-10 rounded-3xl p-8 sm:p-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h3 className="text-3xl font-medium leading-tight tracking-tight">{uc.title}</h3>
            <ul className="mt-6 space-y-3">
              {uc.points.map((p) => (
                <li key={p} className="flex gap-3 text-fog">
                  <Check className="mt-0.5 size-4 shrink-0 text-gas-400" /> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-end border-paper/5 md:border-l md:pl-10">
            <div className="font-serif text-7xl italic text-gas">{uc.metric[0]}</div>
            <div className="mt-2 text-sm text-fog">{uc.metric[1]}</div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-smoke">Design-partner estimate</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Security() {
  const items = [
    { icon: Fingerprint, title: 'Purpose on every case', text: 'Analysts declare a legitimate purpose and legal basis before an investigation starts.' },
    { icon: ScrollText, title: 'Immutable audit trail', text: 'Every query, pivot and export is logged and exportable for your DPO or auditor.' },
    { icon: ShieldCheck, title: 'Public sources only', text: 'Watson only orchestrates lawful, publicly available data. No intrusion, no credential use.' },
    { icon: Lock, title: 'Your searches stay yours', text: 'History is saved on your computer. There is no account to leak.' },
  ]
  return (
    <section className="relative py-28" id="security">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-gas-400">Responsible by design</div>
          <h2 className="mt-4 text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            <span className="text-gradient">Powerful tools deserve</span>{' '}
            <span className="font-serif font-normal italic">guardrails.</span>
          </h2>
          <p className="mt-5 max-w-md text-fog">
            Watson is built for security, compliance and investigations teams, with accountability baked into every
            step, not bolted on.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((i) => (
            <div key={i.title} className="hairline rounded-2xl p-6">
              <i.icon className="size-5 text-gas-400" />
              <h3 className="mt-4 font-medium">{i.title}</h3>
              <p className="mt-1.5 text-sm text-fog">{i.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const points = [
    'Every feature, nothing locked',
    'No account, no email, no password',
    'No credit card, no trial that runs out',
    'No limit on how many searches you run',
  ]
  return (
    <section className="py-28" id="pricing">
      <SectionHead eyebrow="Pricing" title="Free." accent="Not freemium. Free." />
      <div className="mx-auto mt-14 max-w-xl px-4 sm:px-6">
        <div className="relative flex flex-col rounded-2xl border border-gas-400/40 bg-gradient-to-b from-gas-400/10 to-ink-900 p-8 shadow-[0_0_80px_-30px_var(--color-gas-400)]">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-medium tracking-tight">$0</span>
            <span className="text-fog">forever</span>
          </div>
          <ul className="mt-8 space-y-3">
            {points.map((f) => (
              <li key={f} className="flex gap-2.5 text-paper-dim">
                <Check className="mt-0.5 size-4 shrink-0 text-gas-400" /> {f}
              </li>
            ))}
          </ul>
          <Link to="/app" className="mt-8 rounded-full bg-white py-3 text-center text-sm font-medium text-black transition hover:bg-white/85">
            Download free
          </Link>
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="relative px-4 py-32 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[500px] bg-[radial-gradient(ellipse_at_bottom,rgba(242,181,68,0.16),transparent_65%)]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <LogoMark size={56} className="mx-auto" />
        <blockquote className="mt-10 font-serif text-4xl italic leading-tight text-paper sm:text-6xl">
          "You see, but you do not observe."
        </blockquote>
        <p className="mt-6 text-fog">
          Watson observes. <span className="text-paper">Every source, every link, every time.</span>
        </p>
        <Link
          to="/app"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink-950 transition hover:bg-white"
        >
          <Sparkles className="size-4" /> Download free
        </Link>
      </div>
    </section>
  )
}

function Footer() {
  const cols = {
    Product: ['Evidence graph', 'Toolkit', 'Monitors', 'Reports', 'Changelog'],
    Company: ['About', 'Careers', 'Blog', 'Contact'],
    Trust: ['Security', 'Acceptable use', 'Privacy', 'DPA'],
  }
  return (
    <footer className="border-t border-paper/5">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <Logo size={26} />
          <p className="mt-4 max-w-xs text-sm text-fog">The AI analyst for open-source intelligence. Elementary, at scale.</p>
        </div>
        {Object.entries(cols).map(([h, links]) => (
          <div key={h}>
            <div className="text-sm text-paper">{h}</div>
            <ul className="mt-4 space-y-2.5 text-sm text-fog">
              {links.map((l) => (
                <li key={l}>
                  <a href="#" className="inline-flex items-center gap-1 hover:text-paper">
                    {l} {l === 'Changelog' && <ArrowUpRight className="size-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 border-t border-paper/5 px-4 py-6 text-xs text-smoke sm:flex-row sm:px-6">
        <span>© 2026 Watson Intelligence. All rights reserved.</span>
        <span className="font-mono">All systems normal</span>
      </div>
    </footer>
  )
}
