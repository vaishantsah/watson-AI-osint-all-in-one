# Watson design system

Dark, Apple-native, and simple enough for someone who has never heard the word "OSINT".

## Principles

1. **One question, one field.** The home screen asks one thing and has one input. Everything advanced lives behind "Advanced".
2. **Feels like a Mac app, not a website.** System font, system colors, translucent sidebar, grouped inset lists, segmented controls. No marketing chrome inside the app.
3. **The lens is the one bold moment.** A glass magnifier with a cold blue glow on the search screen. Everything around it stays quiet.
4. **Plain words.** "Same person" and "Name match", not "confidence 0.82". Sentence case everywhere, no all-caps labels.

## Color: midnight navy

| Token | Hex | Role |
|---|---|---|
| ink-950 | `#05070C` | Window background |
| ink-850 | `#10151F` | Grouped surfaces, list groups |
| ink-800 | `#182031` | Elevated controls |
| paper | `#FFFFFF` | Primary text, primary buttons (white with black text) |
| fog | `#8590A8` | Secondary text |
| gas-400 | `#82A9F5` | Steel blue accent for icons, links and progress |
| evidence / risk | `#30D158` / `#FF453A` | Same person, high risk |

## Icons

- UI: [Phosphor Icons](https://phosphoricons.com) (MIT), regular weight.
- Site logos: [Simple Icons](https://simpleicons.org) (CC0), drawn white on a dark tile.
- No emoji, no unicode arrows or check marks, no em dashes or middle dots in UI text.

## Type

- **SF Pro** (`-apple-system`) on macOS. SF Pro's license only allows Apple platforms, so it is **not** bundled; Windows falls back to the bundled **Inter Variable** with optical sizing, the closest open match.
- **SF Mono** → Cascadia Mono / Consolas, only for the thing the user typed (usernames, emails, domains).
- Scale (HIG-inspired): Large title 34, Title 28, Title 2 22, Headline 17/600, Body 15, Footnote 13, Caption 11. Tight tracking on titles (-0.02em).

## Layout

```
┌──────────┬──────────────────────────────────────────┐
│ ● ● ●    │                                          │  ← draggable title bar
│ Search   │                 ( lens )                 │
│ History  │        Find anyone's public footprint    │
│          │   ┌──────────────────────────────────┐   │
│ Advanced │   │ ⌕  nickname, email, phone…   [↵] │   │
│  Cases   │   └──────────────────────────────────┘   │
│  Tools   │        johndoe_92   name@mail.com        │
└──────────┴──────────────────────────────────────────┘
```

Results use a grouped inset list (like iOS Settings) under a segmented control, not a grid of cards.

## References

- Linear / Raycast dark product UI — hairline separators, restraint, keyboard-first ([Linear-style write-up](https://bootcamp.uxdesign.cc/the-rise-of-linear-style-design-origins-trends-and-techniques-4fd96aab7646), [Raycast tokens](https://www.webdesignhot.com/design.md/raycast/))
- Apple Human Interface Guidelines — typography, dark mode semantic colors, materials & Liquid Glass ([HIG summary](https://www.superdesign.dev/blog/apple-design-system))
- OSINT Industries — summary bar first, details after ([review](https://osintteam.com/uncover-digital-footprints-with-osint-industries-a-complet-review/))
