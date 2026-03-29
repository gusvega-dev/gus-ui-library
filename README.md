# @gusvega-dev/gus-ui-library

React UI component library built on Tailwind CSS. Pre-compiled styles — no Tailwind setup required by consumers.

## Component Status

### Actions
- [x] Button — `primary | secondary | ghost | inverted`, `sm | md | lg`, disabled

### Form
- [x] Input — forwardRef, error state, disabled
- [x] Label — required marker
- [x] Textarea — forwardRef, resizable
- [x] Checkbox — controlled, disabled
- [x] Radio — controlled, disabled
- [x] Switch — controlled, disabled
- [x] Select — native styled, controlled
- [x] FormField — Label + Input + error message compound
- [ ] Slider — range input (planned)
- [ ] DatePicker — (planned)
- [ ] FileUpload — (planned)

### Data Display
- [x] Badge — `default | secondary | outline`
- [x] Avatar — 3 sizes, 3 colors, image support, stackable
- [x] Tag — with optional remove button
- [x] Stat — metric with optional trend
- [x] Table — Table, TableHeader, TableBody, TableRow, TableHead, TableCell
- [x] Code — inline + block variants
- [x] Kbd — keyboard shortcut key
- [ ] Tooltip — (planned, requires positioning)
- [ ] Timeline — (planned)

### Feedback
- [x] Spinner — 3 sizes
- [x] Progress — animated fill bar
- [x] Alert — `default | outline | filled` with optional title
- [x] Skeleton — shimmer loading placeholder
- [ ] Toast — (planned, requires context/portal)
- [ ] Banner — (planned)

### Navigation
- [x] Link — `default | muted | underline`
- [x] Breadcrumb — with separator
- [x] Tabs — `Tabs | TabsList | TabsTrigger | TabsContent`
- [ ] Pagination — (planned)
- [ ] Navbar — (planned as a compound)

### Layout
- [x] Card — `Card | CardHeader | CardContent | CardFooter`
- [x] Separator — horizontal / vertical
- [x] Stack — row / col with gap and alignment
- [ ] Grid — (planned)
- [ ] Container — (planned)

### Overlay
- [ ] Dialog / Modal — (planned, requires portal)
- [ ] Dropdown — (planned, requires positioning)
- [ ] Popover — (planned, requires positioning)
- [ ] Sheet — (planned, requires portal)

## Installation

React UI component library built on top of Tailwind CSS. Styles are pre-compiled — no Tailwind setup required by consumers. Published to GitHub Packages.

## Installation

```bash
npm install @gusvega-dev/gus-ui-library
```

> Requires GitHub Packages authentication. Add to your `.npmrc`:
> ```
> @gusvega-dev:registry=https://npm.pkg.github.com
> ```

## Usage

1. Import the styles once at your app entry point:

```ts
import '@gusvega-dev/gus-ui-library/dist/style.css';
```

2. Use components:

```tsx
import { Button } from '@gusvega-dev/gus-ui-library';

export default function App() {
  return (
    <div>
      <Button variant="primary" size="md">Click me</Button>
      <Button variant="secondary" size="sm">Cancel</Button>
      <Button variant="ghost" size="lg">Learn more</Button>
    </div>
  );
}
```

## Components

### Button

| Prop      | Type                              | Default     |
| --------- | --------------------------------- | ----------- |
| `variant` | `primary` \| `secondary` \| `ghost` | `primary`   |
| `size`    | `sm` \| `md` \| `lg`             | `md`        |

Also accepts all standard HTML `<button>` attributes.

## Development

Requires `@gusvega-dev/gus-ui-tokens` to be built locally first:

```bash
# 1. Build tokens
cd ../gus-ui-tokens && npm install && npm run build

# 2. Install and build library
cd ../gus-ui-library && npm install && npm run build
```

> Once `@gusvega-dev/gus-ui-tokens` is published to GitHub Packages, update its entry in `package.json` devDependencies from `file:../gus-ui-tokens` to `^0.0.1`.

## Publishing

Versioning is managed with [Changesets](https://github.com/changesets/changesets).

```bash
npx changeset        # create a changeset
npx changeset version # bump versions
npm run release      # publish (CI handles this on merge to main)
```
