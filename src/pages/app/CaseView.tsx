import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  ArrowUp,
  Check,
  Copy,
  DownloadSimple as Download,
  GitFork,
  ArrowsOut as Maximize2,
  Minus,
  Plus,
  Scales as Scale,
  Sparkle as Sparkles,
  Crosshair as Target,
  FilePlus as FilePlus2,
} from '@phosphor-icons/react'
import { LogoMark } from '../../components/Logo'
import { EvidenceGraph, RiskMark, kindIcon } from '../../components/EvidenceGraph'
import { agentSteps, caseGraph, cases } from '../../data/mock'
import type { CaseRow } from '../../data/mock'

const statusStyle: Record<CaseRow['status'], string> = {
  running: 'bg-gas-400/15 text-gas-300',
  review: 'bg-violet/15 text-violet',
  monitoring: 'bg-signal/15 text-signal',
  closed: 'bg-white/[0.08] text-fog',
}

const details: Record<string, { rows: [string, string][]; sources: string[]; note: string }> = {
  sub1: {
    rows: [['First seen', '2021-03-14'], ['Resolves to', '185.193.88.20'], ['Service', 'Fortinet SSL-VPN'], ['TLS issuer', "Let's Encrypt R11"]],
    sources: ['crt.sh', 'OWASP Amass', 'Subfinder'],
    note: 'Internet-facing VPN portal. Combined with an exposed shared mailbox, this is the most likely way in.',
  },
  mail: {
    rows: [['Type', 'Shared mailbox'], ['Data breaches', '1 (2024)'], ['Registered on', '4 public services'], ['Mail provider', 'Microsoft 365']],
    sources: ['theHarvester', 'Have I Been Pwned', 'holehe'],
    note: 'Shared IT mailbox found in a 2024 data breach. Reset its password and check two-factor sign-in.',
  },
}

const riskNote = {
  high: 'Needs attention. Open the evidence below to see why.',
  medium: 'Worth a look, but not urgent.',
  low: '',
}

const answerActions = [
  ['Copy answer', Copy],
  ['Add to report', FilePlus2],
  ['Start a new case from here', GitFork],
] as const

const zoomActions = [
  ['Zoom in', Plus],
  ['Zoom out', Minus],
  ['Center on selected', Target],
  ['Full screen', Maximize2],
] as const

export default function CaseView() {
  const { id } = useParams()
  const c = cases.find((x) => x.id === id) ?? cases[0]
  const [selected, setSelected] = useState('sub1')
  const node = caseGraph.nodes.find((n) => n.id === selected)!
  const d = details[selected] ?? {
    rows: [
      ['Type', node.kind],
      ['Linked items', String(caseGraph.edges.filter((e) => e.from === selected || e.to === selected).length)],
    ],
    sources: ['WHOIS / RDAP'],
    note: node.risk ? riskNote[node.risk] : 'Nothing unusual found yet.',
  }
  const NodeIcon = kindIcon[node.kind]

  return (
    <div className="flex flex-col xl:h-full">
      {/* Case header */}
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.06] px-5 py-3.5">
        <span className="font-mono text-xs text-fog">{c.id}</span>
        <h1 className="text-[15px] font-medium">{c.title}</h1>
        <span className={`rounded-full px-2 py-0.5 text-[11px] capitalize ${statusStyle[c.status]}`}>{c.status}</span>
        <span className="flex items-center gap-1.5 rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-fog">
          <Scale className="size-3" /> {c.purpose}
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <button className="flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-black hover:bg-white/85">
            <Download className="size-3.5" /> Save as PDF
          </button>
        </div>
      </div>

      <div className="grid flex-1 xl:min-h-0 xl:grid-cols-[280px_minmax(0,1fr)_260px] 2xl:grid-cols-[320px_minmax(0,1fr)_300px]">
        {/* Thread */}
        <div className="flex flex-col border-white/[0.06] xl:min-h-0 xl:border-r">
          <div className="scrollbar-thin flex-1 space-y-5 overflow-y-auto overscroll-contain p-4">
            <div className="ml-6 rounded-xl rounded-tr-sm bg-white/[0.06] px-3.5 py-2.5 text-[13px] text-paper">
              Map the external attack surface of acme-logistics.com before we onboard them as a vendor.
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs text-fog">
                <LogoMark size={16} /> Watson
                <span>checked {agentSteps.length} sources in 18 seconds</span>
              </div>
              <div className="mt-3 space-y-2">
                {agentSteps.map((s) => (
                  <div key={s.tool} className="flex items-center gap-2 rounded-lg border border-white/5 bg-ink-900/60 px-2.5 py-1.5">
                    <Check className="size-3 text-evidence" />
                    <span className="text-[13px] text-paper/85">{s.tool}</span>
                    <span className="ml-auto text-[11px] tabular-nums text-fog">{(s.ms / 1000).toFixed(1)}s</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-3 text-[13px] leading-relaxed text-paper-dim">
                <p>
                  <span className="text-paper">Summary.</span> ACME Logistics GmbH runs 23 public websites and servers. Two
                  need attention before onboarding:
                </p>
                <p>
                  <span className="font-medium text-risk">High risk:</span> <span className="font-mono text-paper">vpn.acme-logistics.com</span>{' '}
                  exposes a VPN login page<Cite n={1} />, and the shared mailbox{' '}
                  <span className="font-mono text-paper">it-ops@</span> appears in a 2024 data breach<Cite n={2} />.
                </p>
                <p>
                  <span className="font-medium text-caution">Medium risk:</span> a test server is publicly reachable and is
                  mentioned in two public config files<Cite n={3} />
                  <Cite n={4} />.
                </p>
              </div>
              <div className="mt-3 flex gap-1">
                {answerActions.map(([label, I]) => (
                  <button
                    key={label}
                    aria-label={label}
                    title={label}
                    className="grid size-7 place-items-center rounded-md text-fog hover:bg-white/5 hover:text-paper"
                  >
                    <I className="size-3.5" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <h2 className="text-[13px] font-semibold text-fog">Try next</h2>
              {['Check lookalike domains of acme-logistics', 'Find employees with public profiles', 'Compare with last month’s check'].map((s) => (
                <button
                  key={s}
                  className="flex w-full items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-left text-xs text-paper-dim transition-colors hover:border-gas-400/40 hover:text-paper"
                >
                  <Sparkles className="size-3.5 shrink-0 text-gas-400" /> {s}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-white/[0.06] p-3">
            <div className="flex items-end gap-2 rounded-xl border border-white/10 bg-ink-900 p-2 focus-within:ring-2 focus-within:ring-gas-400/70">
              <textarea
                rows={1}
                aria-label="Ask a follow-up question"
                placeholder="Ask a follow-up…"
                className="flex-1 resize-none bg-transparent px-1.5 py-1 text-[13px] outline-none placeholder:text-fog"
              />
              <button aria-label="Send" className="grid size-7 place-items-center rounded-md bg-white text-black">
                <ArrowUp className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Graph canvas */}
        <div className="dot-grid relative min-h-[560px] overflow-hidden">
          <div className="scrollbar-thin absolute inset-0 overflow-auto overscroll-contain">
            <div className="relative h-full min-h-[560px] min-w-[480px] px-10 pb-16 pt-16">
              <EvidenceGraph nodes={caseGraph.nodes} edges={caseGraph.edges} selected={selected} onSelect={setSelected} showEdgeLabels />
            </div>
          </div>
          <div className="absolute right-4 top-4 z-10 flex flex-col overflow-hidden rounded-lg border border-white/[0.08] bg-ink-900/80 backdrop-blur">
            {zoomActions.map(([label, I]) => (
              <button
                key={label}
                aria-label={label}
                title={label}
                className="grid size-8 place-items-center text-fog hover:bg-white/5 hover:text-paper focus-visible:-outline-offset-3"
              >
                <I className="size-3.5" />
              </button>
            ))}
          </div>
          <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-3 rounded-lg border border-white/[0.08] bg-ink-900/80 px-3 py-2 text-[11px] text-fog backdrop-blur">
            <span className="flex items-center gap-1.5">
              <RiskMark risk="high" /> High risk
            </span>
            <span className="flex items-center gap-1.5">
              <RiskMark risk="medium" /> Medium risk
            </span>
            <span>9 of 214 shown</span>
          </div>
        </div>

        {/* Inspector */}
        <div className="scrollbar-thin border-white/[0.06] p-5 xl:min-h-0 xl:overflow-y-auto xl:overscroll-contain xl:border-l">
          <h2 className="text-[13px] font-semibold text-fog">Selected</h2>
          <div className="mt-3 flex items-start gap-3">
            <span
              className={`grid size-10 shrink-0 place-items-center rounded-xl ${
                node.risk === 'high' ? 'bg-risk/15 text-risk' : node.root ? 'bg-white text-black' : 'bg-white/[0.08] text-paper-dim'
              }`}
            >
              <NodeIcon className="size-5" />
            </span>
            <div className="min-w-0">
              <div className="break-all font-mono text-[13px] text-paper">{node.label}</div>
              <div className="mt-1 text-xs capitalize text-fog">{node.kind}</div>
            </div>
          </div>

          {node.risk && node.risk !== 'low' && (
            <div
              className={`mt-5 flex items-center gap-2 rounded-xl border p-3.5 text-[13px] font-medium ${
                node.risk === 'high' ? 'border-risk/25 bg-risk/5 text-risk' : 'border-caution/25 bg-caution/5 text-caution'
              }`}
            >
              <RiskMark risk={node.risk} />
              {node.risk === 'high' ? 'High risk' : 'Medium risk'}
            </div>
          )}

          {d.note && <p className="mt-5 text-[13px] leading-relaxed text-paper-dim">{d.note}</p>}

          <dl className="mt-5 divide-y divide-white/[0.06] rounded-xl border border-transparent bg-ink-850 ring-1 ring-white/[0.06]">
            {d.rows.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 px-3.5 py-2.5 text-xs">
                <dt className="text-fog">{k}</dt>
                <dd className="text-right text-paper/90">{v}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-5 text-[13px] font-semibold text-fog">Evidence</h2>
          <ol className="mt-2 space-y-1.5">
            {d.sources.map((s, i) => (
              <li key={s} className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-2 text-xs">
                <span className="tabular-nums text-gas-400">[{i + 1}]</span>
                <span className="text-paper-dim">{s}</span>
              </li>
            ))}
          </ol>

          <div className="mt-6 grid grid-cols-2 gap-2">
            <button className="rounded-lg border border-white/10 py-2 text-xs text-paper-dim hover:text-paper">Search from here</button>
            <button className="rounded-lg bg-white/10 py-2 text-xs text-paper hover:bg-white/15">Add to report</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Cite({ n }: { n: number }) {
  return (
    <sup className="ml-0.5 rounded bg-gas-400/10 px-1 text-[11px] tabular-nums text-gas-300" aria-label={`source ${n}`}>
      {n}
    </sup>
  )
}
