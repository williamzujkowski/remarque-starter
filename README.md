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
