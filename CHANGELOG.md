# Changelog

All notable changes to Watson. One entry per public build.

## 1.4.0 — 29 October 2026

A cleanup release. Nothing about the search flow changed; what changed is everything around it.

### Fixes

- Results no longer collapse to a single row when two profiles share an avatar URL.
- Fixed the History list losing the newest search after a restart.
- Long nicknames no longer push the "Same person" badge out of the row.
- The progress bar no longer sticks at 98% when one source times out.
- Corrected the empty-state wording when a domain has no WHOIS records.
- Dismissing the Windows warning no longer leaves the app behind a blank window.

### Design

- New app icon and favicon set: the lens mark now reads clearly at 16 px.
- Search field is taller, with a calmer focus ring and a real clear button.
- Result cards use one consistent corner radius and spacing scale.
- Slightly warmer text colour in dark mode; contrast passes AA everywhere.
- Softer panel borders and shadows, no visible seams on light displays.
- Download page: version label under the button, cleaner footer.

### New tools

- **Subfinder** — passive subdomain enumeration.
- **crt.sh** — Certificate Transparency log search.
- **GLEIF** — legal entity identifiers and ownership chains.
- **Wayback Machine** — historical snapshots of any public URL.
- **GitHub Code Search** (beta) — leaked references in public repositories.

### Under the hood

- Sources screen reports per-tool status; failed lookups are retried once.
- Search history and cases are stored in one local file instead of two.
- Smaller portable build.
