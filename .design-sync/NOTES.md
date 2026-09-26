# design-sync notes — @gusvega/ui

Repo-specific gotchas for future syncs. Shape = `package` (no Storybook).
Project: `@gusvega/ui` → https://claude.ai/design/p/de780fb9-8766-43b0-af11-6d8ebab1ab47

## Build

- Entry: `./dist/index.mjs` (ESM). `dist/` is prebuilt on disk (gitignored but present); rebuild with `npm run build` if source changes.
- CSS + tokens both live in the compiled `./dist/style.css` (`--gus-color-*` tokens baked into `:root`, so components render styled WITHOUT a provider in light mode). No separate tokens package.
- `--node-modules ./node_modules` (repo root) — `react`/`react-dom` are devDeps and resolve there.
- Fonts: **Inter** + **JetBrains Mono** wired via `cfg.extraFonts` → `.design-sync/fonts/fonts.css` (woff2 copied from @fontsource, OFL-licensed). These resolved `[FONT_MISSING]`.

## Known render warns (triaged — legitimate, not new failures)

- **PageIntro, SectionIntro** render THIN in card previews and are intentionally left on the floor card: they are full-page hero components with large top margins (`mt-24…mt-40`) wrapped in `FadeIn`, which starts at `opacity:0` and animates in on scroll — so a static card screenshot is near-empty. Not broken; just not suited to a small card. Author only if a card-friendly composition is wanted.
- 67 components show the honest typographic floor card (unauthored previews — not failures).

## Authored previews (graded good)

14 components authored in `.design-sync/previews/` (29 cells, all `good`): AreaChart, BarChart, LineChart, SparkLine, ButtonGroup, Input, InputGroup, Textarea, Progress, AccordionItem, Collapsible, FormGroup, Spinner, Stat. Wide charts use `cfg.overrides.<Name>.cardMode = "column"`.

## Component count

- Converter discovers **117** exported PascalCase symbols vs 96 `src/components/` dirs. The surplus is legitimate compound sub-parts (CardHeader/CardContent/CardFooter, Table* parts, Tabs* parts, AccordionItem, BreadcrumbItem, GridItem, ListItem) and the 5 chart variants — all real components, kept. To exclude any export, add `componentSrcMap: {"<Name>": null}`.

## Conventions header

- `.design-sync/conventions.md` (wired via `readmeHeader`). Class vocabulary was validated against the compiled CSS: `bg-accent` and `chart-N` utility classes are NOT emitted (charts take colors via props); `shadow-md`, radius `2xl/3xl`, `duration-fast/slower` also absent. Keep the header's class list in sync with what the compiled CSS actually ships.

## Re-sync risks

- Preview data (chart series, form values) is inlined in the `.tsx` files — fine, it's static composition.
- `dist/` must be rebuilt from source before re-sync if components change (`npm run build`).
- ThemeProvider dark-mode path was not visually verified (previews render light mode only).
