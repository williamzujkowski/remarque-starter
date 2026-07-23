# remarque-starter

The minimal, correct starting point for a personal or project site on the
[Remarque](https://github.com/williamzujkowski/remarque) design system —
an Astro + Tailwind v4 site that consumes `remarque-tokens` from npm
(not file copies).

Four page archetypes are included with brief placeholder content:
Landing (`/`), Essay (`/writing`), Project Dossier (`/projects`), and
Notebook (`/notes`) — plus an RSS feed for writing. Self-hosted fonts,
head-inline theme init (no flash of unstyled/wrong theme), a skip link,
and a CI workflow that runs the design system's own accessibility/token
audit are all wired up already.

## Quickstart

1. Use this template:

   ```
   gh repo create my-site --template williamzujkowski/remarque-starter --clone
   cd my-site
   ```

   (Or click "Use this template" on GitHub.)

2. Install and run:

   ```
   npm install
   npm run dev
   ```

3. Replace the placeholder content in `src/pages/` (see "Page archetypes"
   below) and the identity statement on the homepage.

## Personalizing

This site's visual identity comes from the `remarque-tokens` npm
package. You may personalize **palette-tier** tokens only — fonts,
colors, and the reading measure — never the core type scale, spacing,
or motion tokens in `tokens-core.css`. See
`node_modules/remarque-tokens/REMARQUE.md` ("Token Tiers") for the full
rationale.

`src/styles/palette-overrides.css` is a commented template, imported
last in `globals.css`, covering the two sanctioned personalization
moves:

- **Accent hue** — re-derive `--color-accent` and friends at the same
  lightness steps, new hue/chroma.
- **Font-slot swap** — swap in an approved substitute face and update
  `--content-reading` to match (the measure moves with the body font).

After uncommenting and editing it, run the audit and fix every failure
before shipping:

```
npm run audit
```

This wraps `npx remarque-audit --palette node_modules/remarque-tokens/tokens-palette.css --src src`.
Once you've customized `src/styles/palette-overrides.css`, point
`--palette` at that file instead so the audit checks your actual
colors:

```
npx remarque-audit --palette src/styles/palette-overrides.css --src src
```

### Palette from a terminal theme

`remarque-tokens` also ships a color provider bridge: `remarque-theme`
derives a complete palette-tier override from any theme in
[`@williamzujkowski/oklch-terminal-themes`](https://www.npmjs.com/package/@williamzujkowski/oklch-terminal-themes)
(500+ curated terminal color schemes converted to OKLCH). It's the fastest way
to reskin this site — no manual hue math, and the output passes
`remarque-audit` by construction.

1. Install the theme dataset (it's opt-in, not a dependency of this
   template):

   ```
   npm install @williamzujkowski/oklch-terminal-themes
   ```

2. Generate a palette override from a light-theme slug:

   ```
   npx remarque-theme gruvbox-light -o src/styles/palette-override.css
   ```

   `--dark <slug>` defaults to the dataset's `counterpart` pairing when
   the light theme has one (as `gruvbox-light` does here), so most
   themes need no `--dark` flag at all. Browse slugs at the
   [live picker](https://williamzujkowski.github.io/oklch-terminal-themes/)
   or in the package's `index.json`.

3. Import the generated file as the **last** line of
   `src/styles/globals.css` — after the existing
   `@import "./palette-overrides.css";` — so it wins the cascade over
   both the tokens defaults and the "Explicit Light Override" block:

   ```css
   @import "./palette-override.css";
   ```

   Then run the audit against your actual colors:

   ```
   npx remarque-audit --palette src/styles/palette-override.css --src src
   ```

`palette-override.css` is generated output — regenerate it by
re-running `remarque-theme` with new slugs, never hand-edit it (see
`node_modules/remarque-tokens/AGENT_RULES.md`).

## Optional modules

`remarque-tokens` ships two opt-in CSS modules beyond the core, palette,
and prose tiers this template already imports via `@import
"remarque-tokens"` — neither is aggregated into that import or wired
into this starter, since a template shouldn't presume which archetypes
you'll build:

- `remarque-tokens/essay` — sidenotes and a sticky table-of-contents
  rail for long-form Essay pages.
- `remarque-tokens/broadsheet` — masthead, lead article, and numbered
  entry list for a newspaper-style Landing/archive page.

Both are demonstrated on the
[demo site](https://williamzujkowski.github.io/remarque/) rather than
here — import the subpath in `globals.css` if your project needs one.

## Agent-readiness

`CLAUDE.md` and `AGENTS.md` point any AI agent working on this repo at
`node_modules/remarque-tokens/AGENT_RULES.md` (the implementation
contract) and `node_modules/remarque-tokens/REMARQUE.md` (the
specification) before it touches any UI.

## Deploying

`.github/workflows/ci.yml` runs `npm ci`, the token audit, and
`astro build` on every push and pull request. A GitHub Pages `deploy`
job is included but commented out. To enable it:

1. In `astro.config.mjs`, set `site` to your real domain (or
   `https://<user>.github.io`), and `base` to `'/'` for a user/org site
   or `'/<repo>/'` for a project site.
2. In this repo's Settings → Pages, set Source to "GitHub Actions".
3. Uncomment the `deploy` job in `ci.yml`.

## Design system docs

- [williamzujkowski/remarque](https://github.com/williamzujkowski/remarque) — source repo
- `node_modules/remarque-tokens/REMARQUE.md` — specification
- `node_modules/remarque-tokens/AGENT_RULES.md` — implementation contract
