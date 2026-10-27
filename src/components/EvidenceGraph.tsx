import {
  Buildings as Building2,
  Envelope as Mail,
  Globe,
  HardDrives as Server,
  ShieldWarning as ShieldAlert,
  Certificate as FileKey2,
  User,
  At as AtSign,
  GitBranch,
  Warning,
  WarningOctagon,
} from '@phosphor-icons/react'
import type { EntityKind, GraphEdge, GraphNode } from '../data/mock'

export const kindIcon: Record<EntityKind, typeof Globe> = {
  domain: Globe,
  company: Building2,
  email: Mail,
  ip: Server,
  person: User,
  username: AtSign,
  cert: FileKey2,
  leak: ShieldAlert,
  repo: GitBranch,
}

// Things a person typed or a machine issued read better in mono; names don't.
const proseKinds: EntityKind[] = ['company', 'leak', 'person']

const riskRing = {
  high: 'border-risk/60 shadow-[0_0_24px_-4px_var(--color-risk)]',
  medium: 'border-caution/50',
  low: 'border-white/15',
}

/** Shape plus color, so risk never depends on color alone. */
export function RiskMark({ risk }: { risk: 'high' | 'medium' }) {
  return risk === 'high' ? (
    <WarningOctagon weight="fill" className="size-3.5 shrink-0 text-risk" />
  ) : (
    <Warning weight="fill" className="size-3.5 shrink-0 text-caution" />
  )
}

interface Props {
  nodes: GraphNode[]
  edges: GraphEdge[]
  selected?: string
  onSelect?: (id: string) => void
  compact?: boolean
  showEdgeLabels?: boolean
}

export function EvidenceGraph({ nodes, edges, selected, onSelect, compact, showEdgeLabels }: Props) {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))

  return (
    <div className="relative h-full w-full">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        {edges.map((e, i) => {
          const a = byId[e.from]
          const b = byId[e.to]
          const hot = selected && (e.from === selected || e.to === selected)
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              vectorEffect="non-scaling-stroke"
              stroke={hot ? 'var(--color-gas-400)' : 'rgb(255 255 255 / 0.18)'}
              strokeWidth={hot ? 1.5 : 1}
              strokeDasharray="4 4"
            />
          )
        })}
      </svg>

      {showEdgeLabels &&
        edges
          .filter((e) => e.label)
          .map((e, i) => {
            const a = byId[e.from]
            const b = byId[e.to]
            return (
              <span
                key={i}
                aria-hidden
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded bg-ink-900/90 px-1.5 py-0.5 text-[11px] text-fog"
                style={{ left: `${(a.x + b.x) / 2}%`, top: `${(a.y + b.y) / 2}%` }}
              >
                {e.label}
              </span>
            )
          })}

      {nodes.map((n) => {
        const Icon = kindIcon[n.kind]
        const isSel = selected === n.id
        const risky = n.risk === 'high' || n.risk === 'medium'
        return (
          <button
            key={n.id}
            type="button"
            aria-pressed={onSelect ? isSel : undefined}
            onClick={() => onSelect?.(n.id)}
            className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <span
              className={[
                'relative flex items-center gap-2 rounded-full border bg-ink-850/95 backdrop-blur transition-colors',
                compact ? 'py-1 pl-1 pr-2.5' : 'py-1.5 pl-1.5 pr-3',
                n.root ? 'border-white/70 shadow-[0_0_32px_-8px_var(--color-gas-400)]' : riskRing[n.risk ?? 'low'],
                isSel ? 'ring-2 ring-gas-400/70' : 'group-hover:border-white/40',
              ].join(' ')}
            >
              <span
                className={[
                  'grid place-items-center rounded-full',
                  compact ? 'size-5' : 'size-6',
                  n.root ? 'bg-white text-black' : n.risk === 'high' ? 'bg-risk/15 text-risk' : 'bg-white/[0.08] text-paper-dim',
                ].join(' ')}
              >
                <Icon className={compact ? 'size-3' : 'size-3.5'} />
              </span>
              <span
                className={`whitespace-nowrap ${proseKinds.includes(n.kind) ? 'font-sans' : 'font-mono'} ${
                  compact ? 'text-[11px]' : 'text-[12px]'
                } text-paper/90`}
              >
                {n.label}
              </span>
              {risky && (
                <>
                  <RiskMark risk={n.risk as 'high' | 'medium'} />
                  <span className="sr-only">{n.risk === 'high' ? 'High risk' : 'Medium risk'}</span>
                </>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}
