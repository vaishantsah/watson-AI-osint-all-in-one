// Built-in example data used by the screens until real lookups are connected.

export type EntityKind = 'domain' | 'company' | 'email' | 'ip' | 'person' | 'username' | 'cert' | 'leak' | 'repo'

export interface GraphNode {
  id: string
  label: string
  kind: EntityKind
  x: number // 0–100, % of canvas width
  y: number // 0–100, % of canvas height
  risk?: 'low' | 'medium' | 'high'
  root?: boolean
}

export interface GraphEdge {
  from: string
  to: string
  label?: string
}

export const caseGraph: { nodes: GraphNode[]; edges: GraphEdge[] } = {
  nodes: [
    { id: 'root', label: 'acme-logistics.com', kind: 'domain', x: 50, y: 46, root: true },
    { id: 'co', label: 'ACME Logistics GmbH', kind: 'company', x: 26, y: 24 },
    { id: 'sub1', label: 'vpn.acme-logistics.com', kind: 'domain', x: 70, y: 24, risk: 'high' },
    { id: 'sub2', label: 'staging.acme-logistics.com', kind: 'domain', x: 68, y: 58, risk: 'medium' },
    { id: 'ip', label: '185.193.88.14', kind: 'ip', x: 72, y: 88 },
    { id: 'cert', label: 'CN=*.acme-logistics.com', kind: 'cert', x: 48, y: 78 },
    { id: 'mail', label: 'it-ops@acme-logistics.com', kind: 'email', x: 26, y: 68 },
    { id: 'leak', label: '2024 data breach', kind: 'leak', x: 24, y: 92, risk: 'high' },
    { id: 'repo', label: 'github.com/acme-dev', kind: 'repo', x: 50, y: 7, risk: 'medium' },
  ],
  edges: [
    { from: 'root', to: 'co', label: 'WHOIS' },
    { from: 'root', to: 'sub1', label: 'crt.sh' },
    { from: 'root', to: 'sub2', label: 'Amass' },
    { from: 'sub2', to: 'ip', label: 'DNS A' },
    { from: 'root', to: 'cert' },
    { from: 'root', to: 'mail', label: 'theHarvester' },
    { from: 'mail', to: 'leak', label: 'HIBP' },
    { from: 'root', to: 'repo', label: 'code search' },
    { from: 'co', to: 'repo' },
  ],
}

export type ToolCategory = 'Infrastructure' | 'Identity' | 'Corporate' | 'Web & archive' | 'Threat intel' | 'Code'

export interface Tool {
  name: string
  category: ToolCategory
  description: string
  license: string
  status: 'connected' | 'available' | 'beta'
  runs: number
}

export const tools: Tool[] = [
  { name: 'SpiderFoot', category: 'Threat intel', description: 'Automates 200+ OSINT modules across IPs, domains and names.', license: 'MIT', status: 'connected', runs: 1284 },
  { name: 'theHarvester', category: 'Identity', description: 'Collects emails, names, subdomains and hosts from public sources.', license: 'GPL-2.0', status: 'connected', runs: 2310 },
  { name: 'OWASP Amass', category: 'Infrastructure', description: 'In-depth attack surface mapping and asset discovery.', license: 'Apache-2.0', status: 'connected', runs: 1876 },
  { name: 'Subfinder', category: 'Infrastructure', description: 'Fast passive subdomain enumeration.', license: 'MIT', status: 'connected', runs: 3402 },
  { name: 'crt.sh', category: 'Infrastructure', description: 'Certificate Transparency log search.', license: 'Public', status: 'connected', runs: 4120 },
  { name: 'Shodan', category: 'Infrastructure', description: 'Internet-wide scan data for exposed services.', license: 'API key', status: 'available', runs: 0 },
  { name: 'Censys', category: 'Infrastructure', description: 'Hosts, certificates and services on the public internet.', license: 'API key', status: 'available', runs: 0 },
  { name: 'Maigret', category: 'Identity', description: 'Username presence across 3,000+ public sites.', license: 'MIT', status: 'connected', runs: 742 },
  { name: 'holehe', category: 'Identity', description: 'Checks where an email address is registered.', license: 'GPL-3.0', status: 'beta', runs: 318 },
  { name: 'Have I Been Pwned', category: 'Threat intel', description: 'Breach exposure for domains and emails.', license: 'API key', status: 'connected', runs: 980 },
  { name: 'OpenCorporates', category: 'Corporate', description: 'Company registries from 140+ jurisdictions.', license: 'Open data', status: 'connected', runs: 615 },
  { name: 'GLEIF', category: 'Corporate', description: 'Legal Entity Identifiers and ownership chains.', license: 'Open data', status: 'connected', runs: 204 },
  { name: 'Wayback Machine', category: 'Web & archive', description: 'Historical snapshots of any public URL.', license: 'Public', status: 'connected', runs: 1530 },
  { name: 'WHOIS / RDAP', category: 'Web & archive', description: 'Domain registration and registrar records.', license: 'Public', status: 'connected', runs: 2988 },
  { name: 'urlscan.io', category: 'Web & archive', description: 'Sandboxed page scans, screenshots and DOM.', license: 'API key', status: 'available', runs: 0 },
  { name: 'GitHub Code Search', category: 'Code', description: 'Leaked secrets and references in public repos.', license: 'Public API', status: 'beta', runs: 156 },
  { name: 'AlienVault OTX', category: 'Threat intel', description: 'Community threat indicators and pulses.', license: 'Free API', status: 'available', runs: 0 },
  { name: 'GreyNoise', category: 'Threat intel', description: 'Separates targeted traffic from internet noise.', license: 'API key', status: 'available', runs: 0 },
]

export interface CaseRow {
  id: string
  title: string
  target: string
  kind: EntityKind
  purpose: string
  status: 'running' | 'review' | 'closed' | 'monitoring'
  entities: number
  updated: string
  owner: string
}

export const cases: CaseRow[] = [
  { id: 'WT-1042', title: 'ACME Logistics vendor check', target: 'acme-logistics.com', kind: 'domain', purpose: 'Vendor risk', status: 'running', entities: 214, updated: '2 min ago', owner: 'AK' },
  { id: 'WT-1039', title: 'Northwind Holdings due diligence', target: 'Northwind Holdings', kind: 'company', purpose: 'Due diligence', status: 'review', entities: 87, updated: '1 h ago', owner: 'ML' },
  { id: 'WT-1036', title: 'Contoso lookalike domains', target: 'contoso.io', kind: 'domain', purpose: 'Brand protection', status: 'monitoring', entities: 41, updated: '3 h ago', owner: 'SR' },
  { id: 'WT-1031', title: 'Phishing kit infra cluster', target: '45.155.205.0/24', kind: 'ip', purpose: 'Threat intel', status: 'closed', entities: 362, updated: 'Yesterday', owner: 'AK' },
  { id: 'WT-1027', title: 'Leaked credentials sweep', target: 'globex.com', kind: 'domain', purpose: 'Incident response', status: 'closed', entities: 129, updated: 'Oct 22', owner: 'JD' },
]

export const agentSteps = [
  { tool: 'WHOIS / RDAP', text: 'Registrant resolves to ACME Logistics GmbH, Hamburg. Registrar: Gandi SAS.', ms: 412 },
  { tool: 'crt.sh', text: 'Found 38 certificates, 23 unique hostnames. vpn.* first seen 2021-03.', ms: 1180 },
  { tool: 'OWASP Amass', text: 'Passive enumeration surfaced staging.acme-logistics.com → 185.193.88.14.', ms: 8420 },
  { tool: 'theHarvester', text: '6 role mailboxes discovered, incl. it-ops@ and billing@.', ms: 5230 },
  { tool: 'Have I Been Pwned', text: 'it-ops@ appears in 1 breach corpus (2024). Password exposure: hashed.', ms: 640 },
  { tool: 'GitHub Code Search', text: 'Public org acme-dev references staging host in 2 config files.', ms: 2210 },
]

export type SearchKind = 'username' | 'email' | 'phone' | 'domain' | 'company'

/** Guess what the user typed so they never have to pick a type themselves. */
export function detectKind(q: string): SearchKind {
  const s = q.trim()
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return 'email'
  if (/^\+?[\d\s()-]{7,}$/.test(s)) return 'phone'
  if (/^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/.*)?$/i.test(s)) return 'domain'
  if (/\s(ltd|llc|inc|gmbh|corp|ооо|ао)\.?$/i.test(s) || /\s/.test(s)) return 'company'
  return 'username'
}

export type PlatformGroup = 'Social' | 'Dev' | 'Gaming' | 'Forums' | 'Media'

export interface FoundProfile {
  site: string
  group: PlatformGroup
  since: string
  hue: string
  detail: string
  match: 'exact' | 'likely'
}

export const foundProfiles: FoundProfile[] = [
  { site: 'GitHub', group: 'Dev', since: '2019', hue: '#a78bfa', detail: '23 public repos', match: 'exact' },
  { site: 'Reddit', group: 'Forums', since: '2018', hue: '#ff7a45', detail: '1.2k karma', match: 'exact' },
  { site: 'Steam', group: 'Gaming', since: '2016', hue: '#5eead4', detail: 'Level 34', match: 'exact' },
  { site: 'Twitch', group: 'Gaming', since: '2020', hue: '#c084fc', detail: '84 followers', match: 'likely' },
  { site: 'Medium', group: 'Media', since: '2021', hue: '#ede6d6', detail: '6 articles', match: 'exact' },
  { site: 'Telegram', group: 'Social', since: '2020', hue: '#60a5fa', detail: 'Public username', match: 'likely' },
  { site: 'Pinterest', group: 'Social', since: '2017', hue: '#ff6b6b', detail: '3 boards', match: 'likely' },
  { site: 'Stack Overflow', group: 'Dev', since: '2019', hue: '#f2b544', detail: '412 reputation', match: 'exact' },
  { site: 'Chess.com', group: 'Gaming', since: '2022', hue: '#86efac', detail: 'Rapid 1340', match: 'exact' },
  { site: 'SoundCloud', group: 'Media', since: '2015', hue: '#fb923c', detail: '2 tracks', match: 'likely' },
  { site: 'Habr', group: 'Forums', since: '2020', hue: '#7dd3fc', detail: 'Reader', match: 'likely' },
  { site: 'Docker Hub', group: 'Dev', since: '2021', hue: '#38bdf8', detail: '4 images', match: 'exact' },
]

export const EXAMPLE_QUERY = 'johndoe_92'

/**
 * The one place search results come from. Connect real lookups (Maigret,
 * holehe, theHarvester...) here. Until then only the example nickname
 * returns profiles, so no made-up accounts are ever shown for a real person.
 */
export function searchProfiles(query: string): FoundProfile[] {
  return query.trim().toLowerCase() === EXAMPLE_QUERY ? foundProfiles : []
}
