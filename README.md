# @gusvega/ui

A comprehensive React component library built on Tailwind CSS. 97 components covering every layer of a web app — forms, data display, overlays, navigation, layout, charts, and animations — with a built-in semantic theming system, dark mode, and full Next.js App Router compatibility.

## Installation

```bash
npm install @gusvega/ui
```

For chart components, also install the optional peer dependency:

```bash
npm install recharts
```

## Setup

**1. Import the stylesheet once at your app entry point:**

```ts
import '@gusvega/ui/style.css';
```

**2. Wrap your app with `ThemeProvider`:**

```tsx
import { ThemeProvider } from '@gusvega/ui';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider defaultColorMode="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**3. Use components:**

```tsx
import { Button, Heading, Text, Card, CardContent } from '@gusvega/ui';

export default function Page() {
  return (
    <Card>
      <CardContent>
        <Heading level={1}>Hello</Heading>
        <Text variant="muted">Welcome to @gusvega/ui</Text>
        <Button variant="primary">Get started</Button>
      </CardContent>
    </Card>
  );
}
```

---

## Stable 1.0.0 release

GUS UI 1.0.0 is the first stable release of the library. The public package now
has aligned npm metadata, source and issue links, an MIT license, typed exports,
compiled CSS entrypoints, and production documentation at
[ui.gusvega.dev](https://ui.gusvega.dev).

Use this version when you want the documented component API, theme system, and
package links to match across the website, GitHub, and npm.

```bash
npm install @gusvega/ui@1.0.0
```

---

## What's included from 0.5.0

### Next.js App Router compatibility
All 39 interactive components now have `'use client'` directives. Drop any component into a Next.js 13/14/15 App Router project without runtime errors or manual wrapping.

### SSR-safe ThemeProvider
`ThemeProvider` now starts from `defaultColorMode` on both server and client, then syncs from `localStorage` after mount. No more hydration mismatches when using dark mode in Next.js.

### Tree-shaking fixed
Added `"sideEffects": ["./dist/style.css"]` to `package.json`. Bundlers now correctly tree-shake unused components.

### DatePicker — complete rewrite
Label, hint, error message with ARIA, `min`/`max`, `disabled`, `required`, semantic tokens throughout. Previously a bare native input wrapper.

```tsx
<DatePicker
  label="Start Date"
  min="2024-01-01"
  max="2026-12-31"
  required
  hint="Select your travel date"
  error="This field is required"
/>
```

### TimePicker — complete rewrite
Same treatment as DatePicker: label, hint, error, `min`/`max`, `step` (for interval snapping), `disabled`, `required`, ARIA.

```tsx
<TimePicker label="Meeting Time" min="09:00" max="18:00" step={900} hint="Business hours, 15-min intervals" />
```

### DropZone — complete rewrite
Keyboard accessible (Enter/Space to open picker), file list with sizes and per-file removal, `maxSize` validation with error feedback, `multiple`, `accept`, semantic tokens.

```tsx
<DropZone
  multiple
  accept="image/*"
  maxSize={2 * 1024 * 1024}
  label="Drop images here"
  onDrop={(files) => console.log(files)}
/>
```

### FileUpload — complete rewrite
Drag & drop + click-to-browse, multi-file list with name/size display, `maxFiles` guard, `maxSize` per-file validation, progress bar slot per file, per-file removal, keyboard accessible.

```tsx
<FileUpload
  multiple
  accept=".pdf,.doc,.docx"
  maxSize={5 * 1024 * 1024}
  maxFiles={5}
  onFileSelect={(files) => console.log(files)}
/>
```

### CommandPalette — complete rewrite
Full ⌘K command palette: grouped commands, keyboard navigation (↑↓ / Enter / Esc), shortcut badge display, description text, fuzzy search across label/description/group, ARIA-compliant (combobox/listbox/option roles).

```tsx
import { CommandPalette } from '@gusvega/ui';
import { useState } from 'react';

const COMMANDS = [
  { id: 'new-file',  label: 'New File',   shortcut: '⌘+N', group: 'File', action: () => {} },
  { id: 'save',      label: 'Save',        shortcut: '⌘+S', group: 'File', action: () => {} },
  { id: 'dark-mode', label: 'Toggle Dark Mode',             group: 'View', action: () => {} },
];

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Palette</Button>
<CommandPalette commands={COMMANDS} open={open} onClose={() => setOpen(false)} />
```

### Accessibility fixes
- `FormField` — label uses `text-foreground`, errors use `text-destructive` with `role="alert"`, asterisk marked `aria-hidden`
- `Modal` — removed erroneous `aria-hidden` on the dialog wrapper that was hiding content from assistive tech
- `DatePicker` / `TimePicker` — proper `aria-describedby` linking errors and hints to inputs

### Tests
11 new test files — Input, Alert, Toast, Select, Switch, Radio, Accordion, Drawer, FormField, Tooltip, Badge — bringing the suite to 124 tests across 15 files.

---

## Theming

The library uses CSS custom properties for all design tokens. Dark mode is applied via `[data-theme="dark"]` on the root element and managed by `ThemeProvider`.

### ThemeProvider

```tsx
<ThemeProvider
  defaultColorMode="system"   // "light" | "dark" | "system"
  storageKey="my-app-theme"   // localStorage key (default: "gus-ui-color-mode")
>
  {children}
</ThemeProvider>
```

### useTheme hook

```tsx
import { useTheme } from '@gusvega/ui';

const { resolvedColorMode, colorMode, setColorMode, toggleColorMode } = useTheme();
```

### ColorModeToggle

```tsx
import { ColorModeToggle } from '@gusvega/ui';

<ColorModeToggle /> // sun/moon button, wired to useTheme automatically
```

### Override tokens in CSS

```css
:root {
  --gus-color-primary: 99 102 241;          /* indigo */
  --gus-color-primary-foreground: 255 255 255;
  --gus-font-family-sans: "Inter", ui-sans-serif;
  --gus-radius-md: 0.5rem;
}
```

### Override tokens in React

```tsx
import { createThemeVariables } from '@gusvega/ui';

const vars = createThemeVariables({
  colors: { neutral: { 900: '#0f172a' } },
  typography: { fontFamily: { sans: ['Satoshi', 'ui-sans-serif'] } },
});

<div style={vars}>{/* scoped theme */}</div>
```

---

## Design Tokens

### Semantic Colors

| Token | CSS Variable | Usage |
|-------|-------------|-------|
| `background` / `foreground` | `--gus-color-background/foreground` | Page background and primary text |
| `primary` / `primary-foreground` | `--gus-color-primary/primary-foreground` | Primary actions |
| `secondary` / `secondary-foreground` | `--gus-color-secondary/secondary-foreground` | Secondary actions |
| `muted` / `muted-foreground` | `--gus-color-muted/muted-foreground` | Subtle backgrounds and helper text |
| `accent` / `accent-foreground` | `--gus-color-accent/accent-foreground` | Highlights |
| `destructive` / `destructive-foreground` | `--gus-color-destructive/destructive-foreground` | Errors and danger |
| `success` / `success-foreground` | `--gus-color-success/success-foreground` | Positive states |
| `warning` / `warning-foreground` | `--gus-color-warning/warning-foreground` | Caution states |
| `info` / `info-foreground` | `--gus-color-info/info-foreground` | Informational states |
| `border` | `--gus-color-border` | Borders |
| `input` | `--gus-color-input` | Form input borders |
| `ring` | `--gus-color-ring` | Focus rings |
| `card` / `card-foreground` | `--gus-color-card/card-foreground` | Card surfaces |
| `popover` / `popover-foreground` | `--gus-color-popover/popover-foreground` | Overlays |
| `sidebar` / `sidebar-foreground` / `sidebar-border` | `--gus-color-sidebar-*` | Sidebar surfaces |

### Radius

`rounded-sm` · `rounded-md` · `rounded-lg` · `rounded-xl` · `rounded-2xl` · `rounded-3xl` · `rounded-full`

### Shadows

`shadow-xs` · `shadow-sm` · `shadow-md` · `shadow-lg` · `shadow-xl` · `shadow-2xl` · `shadow-inner`

### Animation Tokens

| Token | Value |
|-------|-------|
| `duration-fast` | 100ms |
| `duration-normal` | 150ms |
| `duration-slow` | 300ms |
| `duration-slower` | 500ms |
| `ease-default` | cubic-bezier(0.4, 0, 0.2, 1) |
| `ease-spring` | cubic-bezier(0.34, 1.56, 0.64, 1) |

---

## Components

### Theming
- **ThemeProvider** — `defaultColorMode`, `storageKey`, `attribute`
- **ColorModeToggle** — sun/moon toggle button
- **useTheme** hook — `colorMode`, `resolvedColorMode`, `setColorMode`, `toggleColorMode`

### Typography
- **Heading** — `level: 1–6`, `size`, `weight`
- **Text** — `as`, `size`, `variant: default|muted|destructive|success|warning|info`, `weight`, `truncate`
- **Prose** — styled wrapper for markdown/MDX content, `size: sm|base|lg`
- **Label** — `required`, `invert`
- **Code** — `block` for code blocks, inline by default
- **Kbd** — keyboard shortcut display

### Actions
- **Button** — `variant: primary|secondary|ghost|inverted`, `size: sm|md|lg`
- **IconButton** — icon-only button, requires `aria-label`
- **ButtonGroup** — group of buttons
- **SplitButton** — button with dropdown
- **Link** — `variant: default|muted|underline`
- **SegmentedControl** — segmented option selector
- **ToggleGroup** — toggle button group

### Forms
- **Input** — forwardRef, error state, disabled
- **Textarea** — forwardRef, resizable, disabled
- **NumberInput** — increment/decrement buttons, `min`, `max`, `step`, clamped
- **PinInput** — OTP/PIN boxes, `length`, `mask`, `numeric`, `onComplete`, paste support
- **TagInput** — type-to-add tags, `maxTags`, `triggerKeys`, backspace-to-remove
- **ColorPicker** — hex text input + native color swatch, `showInput`
- **FileInput** — styled button that triggers a hidden `<input type="file">`
- **Checkbox** — controlled, disabled
- **Radio** — controlled, disabled
- **Switch** — controlled, disabled
- **Select** — native styled, controlled
- **MultiSelect** — multiple selection with tag display
- **Slider** — range input
- **DatePicker** — label, hint, error, min/max, disabled, required, ARIA
- **TimePicker** — label, hint, error, min/max, step, disabled, required, ARIA
- **SearchBox** — search input with icon and clear button
- **FormField** — label + input + hint/error compound, `role="alert"` on errors
- **FormGroup** — group of form fields
- **InputGroup** — input with prefix/suffix addons
- **FileUpload** — drag & drop + click, multi-file list, maxFiles/maxSize, progress slot
- **DropZone** — keyboard-accessible drop zone, file list, maxSize validation

### Data Display
- **Badge** — `variant: default|secondary|outline`
- **AdvancedBadge** — extended badge with icon support
- **BadgeCounter** — numeric badge counter
- **Avatar** — sizes, colors, image support
- **Tag** — with optional remove button
- **Chip** — selectable chip
- **Stat** — metric with optional trend indicator
- **Rating** — star rating, readonly mode
- **Table** — `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`
- **DataGrid** — sortable data table
- **Pagination** — page navigation
- **Breadcrumb** — with separator
- **List** — ordered/unordered list
- **Carousel** — scrollable content carousel
- **Timeline** — vertical timeline
- **Tree** — hierarchical tree view

### Feedback
- **Alert** — `variant: default|outline|filled`, optional title
- **AlertDialog** — confirmation dialog
- **Spinner** — `size: sm|md|lg`
- **Progress** — animated progress bar
- **ProgressRing** — circular progress indicator
- **Skeleton** — shimmer loading placeholder
- **Toast** — `type: info|success|error|warning`, auto-dismiss, `aria-live`
- **Tooltip** — hover/focus tooltip with directional placement
- **LoadingOverlay** — full-area loading state

### Navigation
- **Tabs** — `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`, ARIA-compliant
- **IconTabs** — tabs with icons
- **Menu** — dropdown menu
- **NavigationMenu** — top-level nav with optional submenus
- **Sidebar** — collapsible sidebar navigation
- **Stepper** — multi-step progress indicator

### Overlay
- **Modal** — focus trap, Esc to close, `size: sm|md|lg`, `footer`
- **Drawer** — slide-in panel, focus trap, Esc to close, `side: left|right`
- **Popover** — floating content panel, Esc to close
- **HoverCard** — hover-triggered info card
- **CommandPalette** — grouped commands, keyboard nav, shortcut badges, fuzzy search
- **Combobox** — searchable select

### Layout
- **Container** — max-width content wrapper
- **Grid** — responsive CSS grid, `cols` (number or `{ base, sm, md, lg, xl }`), `gap`
- **GridItem** — grid child with `colSpan`, `rowSpan`
- **AspectRatio** — ratio-preserving wrapper
- **ScrollArea** — overflow container with styled scrollbar, `direction: vertical|horizontal|both`
- **Sticky** — sticky-positioned wrapper
- **Card** — `Card`, `CardHeader`, `CardContent`, `CardFooter`
- **Stack** — `direction: row|col`, gap, alignment
- **Separator** — horizontal/vertical divider
- **Accordion** — expandable sections with ARIA
- **Collapsible** — toggle show/hide

### Charts

> Requires `recharts` as a peer dependency: `npm install recharts`

- **LineChart** — `series`, `xKey`, `curved`, `grid`, `tooltip`, `legend`
- **BarChart** — `series`, `xKey`, `stacked`, `rounded`, `grid`, `tooltip`, `legend`
- **AreaChart** — `series`, `xKey`, `stacked`, `fillOpacity`, `curved`, `grid`, `tooltip`, `legend`
- **PieChart** — `data`, `donut`, `innerRadiusRatio`, `tooltip`, `legend`
- **SparkLine** — `data` (number[]), `type: line|area|bar`, `color`, `height`, `tooltip`

All charts use the 6-color `chart-1`–`chart-6` palette, adapt to dark mode, and respect the library's border/radius/typography tokens.

```tsx
import { LineChart, BarChart, AreaChart, PieChart, SparkLine } from '@gusvega/ui';

const data = [
  { month: 'Jan', revenue: 4000, users: 240 },
  { month: 'Feb', revenue: 5200, users: 310 },
  { month: 'Mar', revenue: 4800, users: 280 },
];

<LineChart data={data} xKey="month" series={[
  { key: 'revenue', label: 'Revenue' },
  { key: 'users', label: 'Users' },
]} />

<PieChart donut data={[
  { name: 'Mobile', value: 60 },
  { name: 'Desktop', value: 30 },
  { name: 'Tablet', value: 10 },
]} />

<SparkLine data={[4, 7, 2, 9, 5, 11, 8]} type="area" height={40} />
```

### Animations

All animation components are scroll-triggered via `IntersectionObserver` — no framer-motion dependency.

- **FadeIn** — fade + slide up on scroll, `delay`, `duration`, `offset`, `once`
- **FadeInStagger** — `FadeIn` applied to each child with a staggered delay
- **SlideIn** — slide from `top | bottom | left | right`, `distance`, `delay`, `once`
- **ScaleIn** — scale up from `from` value, spring easing, `delay`, `once`
- **BlurIn** — blur-to-sharp reveal with optional y-offset, `blur`, `offset`, `delay`, `once`
- **CountUp** — animated number counter, `from`, `to`, `duration`, `decimals`, `prefix`, `suffix`, `separator`, `once`
- **TypeWriter** — character-by-character text, `words` (string or array), `speed`, `deleteSpeed`, `loop`, `cursor`

```tsx
import { FadeIn, FadeInStagger, SlideIn, CountUp, TypeWriter } from '@gusvega/ui';

<FadeIn delay={100} duration={600}>
  <Card>...</Card>
</FadeIn>

<FadeInStagger stagger={80}>
  <div>Item 1</div>
  <div>Item 2</div>
</FadeInStagger>

<SlideIn from="left" distance={32} delay={200}>
  <Heading level={2}>Features</Heading>
</SlideIn>

<CountUp from={0} to={10000} suffix="+" separator="," duration={2000} />

<TypeWriter words={['developer', 'designer', 'builder']} speed={80} />
```

### Content
- **Blockquote** — styled blockquote
- **EmptyState** — empty content placeholder with icon, title, and action
- **InfoBox** — informational panel with type variants
- **PageIntro** — page-level intro block
- **SectionIntro** — section-level intro block
- **CodeBlockAdvanced** — syntax-highlighted code block with copy button

---

## Development

```bash
cd ui-library/gus-ui-library
npm install
npm run dev      # watch mode
npm run build    # production build
npm run release  # publish to npm via changesets
```
