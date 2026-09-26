## Building with @gusvega/ui

A React + Tailwind component library. Import components from `@gusvega/ui`; style your own layout glue with the Tailwind **semantic token classes** below (never hard-coded hex — the tokens carry light/dark theming).

### Setup & theming
- **Design tokens are global.** They are defined on `:root` in the shipped stylesheet, so every component renders correctly styled **without any provider** in light mode.
- **`ThemeProvider` is only needed for dark mode / color-mode switching.** Wrap the app root in `<ThemeProvider>` to enable `ColorModeToggle`, the `useTheme` hook, and the `data-theme="dark"` token set. Without it, components still render (light theme); with it, dark mode works and tokens flip automatically.
- Fonts: **Inter** (UI text) and **JetBrains Mono** (code) ship with the bundle — no setup needed.

### Styling idiom — use semantic token utilities
This is a utility-class system. Prefer these semantic classes so your markup themes with the components (each has a `bg-*`, `text-*`, and/or `border-*` form):

| Class family | Use for |
|---|---|
| `bg-background` / `text-foreground` | page surface + default text |
| `bg-primary` / `text-primary-foreground` | primary actions, emphasis |
| `bg-secondary` / `text-secondary-foreground` | secondary surfaces |
| `bg-muted` / `text-muted-foreground` | subtle fills, captions, placeholders |
| `bg-card` / `bg-popover` (+ `-foreground`) | cards, menus, overlays |
| `bg-destructive` / `bg-success` / `bg-warning` / `bg-info` (+ `-foreground`) | status |
| `border-border` / `border-input` / `ring-ring` | borders + focus rings |
| `text-neutral-50` … `text-neutral-950` | raw greyscale when a semantic token doesn't fit |

Radius: `rounded-sm|md|lg|xl|full`. Shadow: `shadow-xs|sm|lg|xl|2xl`. Transitions: `duration-normal|slow`. Spacing/typography follow the standard Tailwind scale. (Chart series colors are set through the chart components' own props/data, not utility classes.)

### Where the truth lives
- The bound stylesheet (`styles.css` and its `@import` closure) defines every token — read it before inventing colors.
- Each component ships a `<Name>.d.ts` (its props contract) and a `<Name>.prompt.md` (usage) — read those to compose a component correctly.

### Idiomatic example
```tsx
import { Card, CardHeader, CardContent, Button, Stat } from '@gusvega/ui';

export function RevenueCard() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <h3 className="text-foreground font-semibold">Revenue</h3>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-4">
        <Stat label="This month" value="$48.2k" change="+12.5%" trend="up" />
        <Button>View report</Button>
      </CardContent>
    </Card>
  );
}
```
