# Agent Instructions

This site uses the Remarque design system via the `remarque-tokens` npm package. Before any UI work, read `node_modules/remarque-tokens/AGENT_RULES.md` (implementation contract) and `node_modules/remarque-tokens/REMARQUE.md` (specification).

Personalize ONLY palette-tier tokens (see "Token Tiers" in REMARQUE.md) — never `tokens-core.css`. Use `src/styles/palette-overrides.css` as the starting point.

After any palette change, run:

```
npx remarque-audit --palette src/styles/<your-palette>.css --src src
```

Fix every failure before shipping. Do not suppress or skip the audit.
