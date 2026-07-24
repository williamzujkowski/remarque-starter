# Agent Instructions

This is a **remarque-tokens consumer site**: an Astro project that consumes the Remarque design system from npm rather than vendoring its CSS. Do not fork tokens — personalize the palette tier only.

## Where the contract lives

- `.claude/skills/remarque/SKILL.md` — load before building or reviewing any page. States the tier rules, the audit command, and the two build-time pitfalls that pass a green build while silently breaking.
- `.claude/skills/remarque-adopt/SKILL.md` — load when bumping the `remarque-tokens` pin, or when the audit starts failing after one. The consumer-conformance playbook.
- `node_modules/remarque-tokens/AGENT_RULES.md` — implementation contract (build order, non-negotiables, disallowed patterns).
- `node_modules/remarque-tokens/REMARQUE.md` — full specification (philosophy, token tiers, page archetypes).
- `node_modules/remarque-tokens/tokens.json` + `tokens.schema.json` — machine-readable token values and their schema. Read these instead of guessing a value from memory.
- `node_modules/remarque-tokens/registry/` (index: `registry.json`) — versioned, hash-verified markup contracts for the Essay/Broadsheet/Forms/Palette-Deck modules. Fetch an item instead of transcribing markup from spec prose.
- https://williamzujkowski.github.io/remarque/llms.txt — canonical machine-readable pointer to the same contract, for an agent without this repo's `node_modules` on disk.

## Gates

- `npm run audit` — contrast, gamut, font-size floors, no hardcoded colors. Pass `-- --json` for a machine-parseable result. Every failure blocks shipping.
- Token drift between the installed package and this project's own overrides isn't wired into this repo's CI, but is available as a reusable `workflow_call`: `williamzujkowski/remarque`'s `.github/workflows/token-drift.yml`.

## Rule hierarchy

`AGENT_RULES.md` governs implementation. A deviation from it is only valid if documented (`DESIGN-DEVIATIONS.md` / `DESIGN-NOTES.md`) — undocumented, it's a bug.
