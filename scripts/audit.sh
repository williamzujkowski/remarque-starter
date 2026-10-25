#!/usr/bin/env sh
# Audit the palette this site actually ships.
#
# By default src/styles/palette-overrides.css is entirely commented out, so
# the live palette IS the package's tokens-palette.css. Once you uncomment
# the block in palette-overrides.css, that file defines your palette and
# is what must pass the audit (contrast, gamut, font floors, hardcoded
# colors, font features) — not the package defaults it replaced.
set -eu
overrides=src/styles/palette-overrides.css
palette=node_modules/remarque-tokens/tokens-palette.css
# An active (uncommented) override block declares `--color-bg` at the
# start of a line; the commented template has the same text inside /* */
# but is stripped first.
if perl -0pe 's{/\*.*?\*/}{}gs' "$overrides" | grep -q -- '--color-bg:'; then
  palette=$overrides
fi
echo "audit: palette = $palette"
exec npx remarque-audit --palette "$palette" --src src "$@"
