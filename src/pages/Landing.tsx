import { useEffect, type ReactNode } from 'react'
import {
  Check,
  ClockCounterClockwise,
  DownloadSimple,
  FilePdf,
  LockSimple,
  ShieldCheck,
  Sparkle,
  UserCheck,
  WindowsLogo,
  X,
} from '@phosphor-icons/react'
import { Logo } from '../components/Logo'
import { GlassLens } from '../components/GlassLens'
import { BrandIcon } from '../components/BrandIcon'
import demoSearch from '../../docs/images/demo-search.gif'
import demoFilters from '../../docs/images/demo-filters.gif'
import demoGraph from '../../docs/images/demo-graph.gif'
import screenSearch from '../../docs/images/screen-search.png'
import screenScanning from '../../docs/images/screen-scanning.png'
import screenResults from '../../docs/images/step-4-results.png'

const sites = ['GitHub', 'Reddit', 'Steam', 'Twitch', 'Medium', 'Telegram', 'Pinterest', 'Stack Overflow', 'Chess.com', 'SoundCloud', 'Habr', 'Docker Hub']

// Served by the watsonfind.icu host at /api/download (see the nginx site config).
export const DOWNLOAD_URL = '/api/download'

const nav = [
  ['How it works', '#how'],
  ['Features', '#features'],
  ['Free', '#free'],
  ['FAQ', '#faq'],
]

export default function Landing() {
  useEffect(() => {
    document.title = 'Watson: stop googling, start knowing'
  }, [])

  return (
    <div className="relative min-h-dvh overflow-x-clip bg-ink-950 text-paper">
      <Header />
      <main>
        <Hero />
        <Sites />
        <Problem />
        <HowItWorks />
        <Compare />
        <Features />
        <Free />
        <SeeYourself />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}

function DownloadButton({ size = 'md' }: { size?: 'md' | 'lg' }) {
  return (
    <a
      href={DOWNLOAD_URL}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-white font-medium text-black transition-colors hover:bg-white/85 ${
        size === 'lg' ? 'h-12 px-6 text-[16px]' : 'h-9 px-4 text-[14px]'
      }`}
    >
      <WindowsLogo weight="fill" className={size === 'lg' ? 'size-5' : 'size-4'} />
      Download free
    </a>
  )
}

function Header() {
  return (
    <header className="material fixed inset-x-0 top-0 z-50 border-b border-white/[0.06]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#top" className="rounded-md" aria-label="Watson home">
          <Logo size={24} />
        </a>
        <nav aria-label="Sections" className="hidden items-center gap-7 text-[14px] text-paper-dim md:flex">
          {nav.map(([label, href]) => (
            <a key={href} href={href} className="transition-colors hover:text-paper">
              {label}
            </a>
          ))}
        </nav>
        <DownloadButton />
      </div>
    </header>
  )
}

function Window({ children, label }: { children: ReactNode; label: string }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-[0_40px_120px_-40px_rgba(86,131,224,0.5)]">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5" aria-hidden>
        <span className="size-2.5 rounded-full bg-white/10" />
        <span className="size-2.5 rounded-full bg-white/10" />
        <span className="size-2.5 rounded-full bg-white/10" />
      </div>
      {children}
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  )
}

function Hero() {
  return (
    <section id="top" className="relative px-5 pt-32 sm:pt-40">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[640px] w-[1000px] max-w-[200vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(86,131,224,0.22),transparent)]" />
      <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,#000_15%,transparent_65%)]" />

      <div className="relative mx-auto max-w-6xl text-center">
        <div className="mx-auto w-fit">
          <GlassLens size={88} />
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2 text-[13px]">
          <span className="rounded-full bg-evidence/15 px-3 py-1 font-semibold text-evidence">100% free</span>
          <span className="rounded-full bg-white/[0.07] px-3 py-1 text-paper-dim">No account</span>
          <span className="rounded-full bg-white/[0.07] px-3 py-1 text-paper-dim">No credit card</span>
        </div>
        <h1 className="mx-auto mt-6 max-w-4xl text-balance text-[44px] font-bold leading-[1.02] tracking-[-0.035em] sm:text-[72px] lg:text-[88px]">
          Stop googling.
          <br />
          Start knowing.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-[17px] leading-relaxed text-paper-dim sm:text-[20px]">
          Type a nickname, email, phone or website. Watson checks 3,100+ public sites and tells you what it found, in plain
          words. Free, forever.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <DownloadButton size="lg" />
        </div>
        <p className="mt-4 text-[13px] text-fog">Windows 10 and 11. One file, nothing to install.</p>

        <div className="mx-auto mt-16 max-w-5xl">
          <Window label="Searching a nickname in Watson">
            <img src={demoSearch} alt="Typing johndoe_92 into Watson and getting a list of matching profiles" className="block w-full" />
          </Window>
        </div>
      </div>
    </section>
  )
}

function Sites() {
  return (
    <section aria-labelledby="sites-title" className="px-5 py-20">
      <h2 id="sites-title" className="text-center text-[15px] text-fog">
        3,100+ public sites, including
      </h2>
      <ul className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-5">
        {sites.map((s) => (
          <li key={s} className="flex items-center gap-2 text-[15px] text-paper-dim">
            <BrandIcon site={s} className="size-5 text-paper" />
            {s}
          </li>
        ))}
      </ul>
    </section>
  )
}

function Problem() {
  return (
    <section className="px-5 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-[34px] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[52px]">
          You’re about to trust someone. Do you know who they are?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-[17px] leading-relaxed text-paper-dim sm:text-[19px]">
          The new supplier. The guy selling you a car. The recruiter in your inbox. The answer is already public, scattered
          across thousands of sites. Finding it by hand takes a weekend and a dozen tabs.{' '}
          <span className="font-semibold text-paper">Watson takes one field.</span>
        </p>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { title: 'Type what you know', text: 'A nickname, email, phone or website. Watson works out which one it is.', img: screenSearch, alt: 'Watson search screen with one field' },
    { title: 'Watson checks 3,100+ sites', text: 'Social networks, forums, games, developer sites and more, all at once.', img: screenScanning, alt: 'Watson scanning sites with a progress bar' },
    { title: 'Read one clear answer', text: 'A short summary, every profile it found, and whether they belong to the same person.', img: screenResults, alt: 'Watson results with a summary and a list of profiles' },
  ]
  return (
    <section id="how" className="scroll-mt-20 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-[34px] font-bold tracking-[-0.03em] sm:text-[48px]">Three steps. No learning curve.</h2>
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="flex flex-col">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900">
                <img src={s.img} alt={s.alt} className="block aspect-[16/10] w-full object-cover object-top" loading="lazy" />
              </div>
              <div className="mt-5 flex items-center gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-[15px] font-bold text-black">{i + 1}</span>
                <h3 className="text-[20px] font-semibold tracking-[-0.01em]">{s.title}</h3>
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-fog">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Compare() {
  const rows: [string, string, string, string][] = [
    ['Time to first answer', 'Hours', 'Minutes, after setup', 'Seconds'],
    ['Skills you need', 'Patience', 'Terminal, Python, API keys', 'None'],
    ['Tells you what it means', 'no', 'no', 'Yes, in plain words'],
    ['Same person or same name?', 'You guess', 'You guess', 'Watson tells you'],
    ['Report you can send', 'Copy and paste', 'Raw JSON', 'One-click PDF'],
    ['Account', 'n/a', 'One per API', 'None'],
    ['Price', 'Your weekend', 'Paid API keys add up', '$0, forever'],
  ]
  const cell = (v: string) =>
    v === 'no' ? (
      <X className="mx-auto size-5 text-fog" aria-label="No" />
    ) : (
      v
    )
  return (
    <section className="px-5 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-[34px] font-bold tracking-[-0.03em] sm:text-[48px]">The old way is slow. And it costs you.</h2>
        <div className="mt-12 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[640px] border-collapse text-left text-[15px]">
            <thead>
              <tr className="border-b border-white/[0.08] text-fog">
                <th scope="col" className="p-4 font-medium">
                  <span className="sr-only">Question</span>
                </th>
                <th scope="col" className="p-4 text-center font-medium">By hand</th>
                <th scope="col" className="p-4 text-center font-medium">Command-line tools</th>
                <th scope="col" className="bg-white/[0.06] p-4 text-center font-semibold text-paper">
                  <span className="inline-flex items-center gap-2">
                    <Logo size={18} />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([q, a, b, w]) => (
                <tr key={q} className="border-b border-white/[0.06] last:border-0">
                  <th scope="row" className="p-4 font-medium text-paper-dim">{q}</th>
                  <td className="p-4 text-center text-fog">{cell(a)}</td>
                  <td className="p-4 text-center text-fog">{cell(b)}</td>
                  <td className="bg-white/[0.06] p-4 text-center font-semibold text-paper">
                    <span className="inline-flex items-center gap-1.5">
                      <Check weight="bold" className="size-4 text-evidence" /> {w}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function Feature({ title, text, img, alt, flip }: { title: string; text: string; img: string; alt: string; flip?: boolean }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr]">
      <div className={flip ? 'lg:order-2' : ''}>
        <h3 className="text-balance text-[28px] font-bold leading-[1.15] tracking-[-0.025em] sm:text-[36px]">{title}</h3>
        <p className="mt-4 max-w-md text-[17px] leading-relaxed text-paper-dim">{text}</p>
      </div>
      <Window label={alt}>
        <img src={img} alt={alt} className="block w-full" loading="lazy" />
      </Window>
    </div>
  )
}

function Features() {
  const small = [
    { icon: UserCheck, title: 'Same person or same name', text: 'Green means the profiles link to each other. Grey means only the nickname matches.' },
    { icon: Sparkle, title: 'Plain words, not raw data', text: 'A summary you can read in ten seconds, not a wall of links.' },
    { icon: FilePdf, title: 'One-click PDF', text: 'Save what Watson found and send it to whoever needs to know.' },
    { icon: ClockCounterClockwise, title: 'History on your computer', text: 'Every search is saved locally, so you never lose a lead.' },
  ]
  return (
    <section id="features" className="scroll-mt-20 px-5 py-24">
      <div className="mx-auto max-w-6xl space-y-24">
        <Feature
          title="Filter in one click. Never lose a lead."
          text="Narrow results to social networks, games, developer sites and more. Come back to any search later from History."
          img={demoFilters}
          alt="Filtering results by type and opening History"
        />
        <Feature
          flip
          title="Follow the trail."
          text="For bigger jobs, Cases connect everything Watson found into one map. Click any point to see what it is, why it matters and where the proof came from."
          img={demoGraph}
          alt="Clicking points on the Watson connections map"
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {small.map((f) => (
            <li key={f.title} className="hairline rounded-2xl p-6">
              <f.icon className="size-6 text-gas-400" />
              <h3 className="mt-4 text-[17px] font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-fog">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Free() {
  const points = ['Every feature, nothing locked', 'No account, no email, no password', 'No credit card, no trial that runs out', 'No limit on searches']
  return (
    <section id="free" className="scroll-mt-20 px-5 py-24">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-ink-900 px-6 py-14 text-center sm:px-14">
        <div className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-80 w-[640px] max-w-full rounded-full bg-[radial-gradient(closest-side,rgba(48,209,88,0.18),transparent)]" />
        <h2 className="relative text-[64px] font-bold leading-none tracking-[-0.04em] sm:text-[96px]">$0</h2>
        <p className="relative mt-3 text-[22px] font-semibold sm:text-[26px]">Not freemium. Not a trial. Free.</p>
        <ul className="relative mx-auto mt-8 grid max-w-xl gap-3 text-left sm:grid-cols-2">
          {points.map((p) => (
            <li key={p} className="flex gap-2.5 text-[15px] text-paper-dim">
              <Check weight="bold" className="mt-0.5 size-4 shrink-0 text-evidence" /> {p}
            </li>
          ))}
        </ul>
        <div className="relative mt-10">
          <DownloadButton size="lg" />
        </div>
      </div>
    </section>
  )
}

function SeeYourself() {
  return (
    <section className="px-5 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-[15px] text-fog">Our address is</p>
        <h2 className="mt-2 text-[11.5vw] font-bold leading-none tracking-[-0.04em] sm:text-[96px]">
          watsonfind<span className="text-gas-400">.icu</span>
        </h2>
        <p className="mt-6 text-[20px] text-paper-dim sm:text-[24px]">
          Read it out loud: <span className="font-semibold text-paper">Watson, find. I see you.</span>
        </p>
        <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-fog">
          Now find out what the internet sees about you. Search your own nickname before someone else does.
        </p>
        <div className="mt-8">
          <DownloadButton size="lg" />
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const qa: [string, ReactNode][] = [
    ['How much does it cost?', 'Nothing. Watson is free with every feature included. There is no paid version.'],
    ['Do I need an account?', 'No. There is no sign-up and no login. Your search history is saved only on your own computer.'],
    [
      'Is it legal?',
      'Watson only looks at information that is already public: things anyone could find with a browser and enough time. It doesn’t hack, log in as anyone or buy leaked data. How you use what you find is up to you, so follow the law where you live.',
    ],
    [
      'Windows says it protected my PC. Is the file safe?',
      'Windows shows that screen for any new app without a paid code-signing certificate. Click More info, then Run anyway. You only do it once.',
    ],
    ['Does it work on Mac?', 'Not yet. Watson today is a Windows program; a Mac version may come later.'],
  ]
  return (
    <section id="faq" className="scroll-mt-20 px-5 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-[34px] font-bold tracking-[-0.03em] sm:text-[48px]">Questions</h2>
        <div className="mt-10 divide-y divide-white/[0.08] rounded-2xl border border-white/10 bg-ink-900">
          {qa.map(([q, a]) => (
            <details key={q} className="group px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md text-[17px] font-medium">
                {q}
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/[0.08] text-fog transition-transform group-open:rotate-45 motion-reduce:transition-none">
                  <PlusIcon />
                </span>
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-paper-dim">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" aria-hidden>
      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <Logo size={24} />
          <p className="mt-3 text-[15px] text-fog">watsonfind.icu</p>
        </div>
        <div className="max-w-md space-y-3 text-[13px] leading-relaxed text-fog">
          <p className="flex gap-2">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-paper-dim" />
            Built for checking who you’re dealing with: vendors, partners, sellers, job offers and your own footprint. Don’t use it
            to stalk, harass or threaten anyone.
          </p>
          <p className="flex gap-2">
            <LockSimple className="mt-0.5 size-4 shrink-0 text-paper-dim" />
            Public information only. No account, no tracking, history stays on your computer.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-[14px]">
          <a href={DOWNLOAD_URL} className="inline-flex items-center gap-2 text-paper-dim hover:text-paper">
            <DownloadSimple className="size-4" /> Download for Windows
          </a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-[12px] text-fog">© 2026 Watson. Free forever.</p>
    </footer>
  )
}
