# Creative Brief — Chicken Ember (chickenember.fr)

Google-first revision (2026-06-11): performance and local-SEO conversion outrank spectacle wherever they conflict. Immersion is progressive enhancement only.

## Spatial Metaphor
Scrolling is approaching the fire: the page starts in cool charcoal dark and heats — char black → ember red → glowing orange — peaking at the menu and the order CTA, settling into warm calm at reviews and contact.

## Animation Personality
Confident, warm, unhurried — heat rather than speed. Entrances rise like warm air (power3.out, 0.6–0.9 s). Scrubbed parallax is shallow. Nothing bounces, nothing spins. On mobile and reduced-motion, content is simply *there* — visible by default, no choreography debt.

## Color Palette
- --char: #0D0A08 (warm near-black base)
- --coal: #1A1310 (raised surfaces)
- --ember: #FF4D1C (primary accent, CTAs)
- --glow: #FFB259 (highlights, hover heat)
- --smoke: #8A817A (secondary text)
- --creme: #F4EDE4 (primary text on dark)
- --sauce: #4E8C3F (sauce-verte accent — badges + signature section only)

## Typography
- Display: **Anton** (single weight, condensed, self-hosted woff2 subset) — French shouting in caps.
- Text: **Archivo** 400/600 (self-hosted woff2 subsets).
- font-display strategy + preload on the two critical files. No icon fonts (inline SVG only).

## Scroll Architecture
**Native scroll on touch; Lenis on fine-pointer desktop only**, lazy-initialized after first paint. No pinned/hijacked scenes on mobile. Google's INP and the lunch-rush user always win.

## Signature Interaction
« Souffler sur la braise » — press-and-hold (or hold-click) fans the coals: the ember field flares and the held element ignites from outline to ember-gradient fill. Used in exactly three places: hero title, menu section header, order CTA. Keyboard/click equivalent provided.

## Section Themes
1. Le Feu (hero) — char, ember type, status chip « Ouvert · jusqu'à 22h30 »
2. La Braise (histoire) — coal, smoke text, parallax imagery
3. Le Menu — heat rises: ember tints surfaces, cards ignite on entry
4. La Sauce Verte — the only cold-accent set piece (--sauce)
5. Les Avis — warm glow, 4,9★ marquee of real Google reviews
6. Le Quartier — calm warm, map + NAP + transport
7. Commander — peak heat, smouldering CTA

## Performance Contract (overrides everything above)
- Critical-path JS ≤ 150 KB gz; GSAP core only on first load; ember canvas is a hand-rolled 2D-canvas particle layer (~3 KB), dynamically imported on idle after LCP. No three.js dependency.
- LCP = hero `<img>` poster (AVIF/WebP), ≤ 1.8 s mobile. CLS ≈ 0. All content present in prerendered HTML with JS disabled.
- Fallback chain: full (desktop/capable) → CSS-only ambience (low-end / save-data) → static (reduced-motion / no-JS).

INIT_FLAGS: --font-files
