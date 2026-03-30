# @gusvega/ui

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

React UI component library built on top of Tailwind CSS. Styles are pre-compiled — no Tailwind setup required by consumers. Published to npm.

## Installation 

```bash
npm install @gusvega/ui
```

## Usage

1. Import the styles once at your app entry point:

```ts
import 'gus-ui-library/dist/style.css';
```

2. Import and use components:

```tsx
import { Button, Input, Card, CardHeader, CardContent } from 'gus-ui-library';

export default function App() {
  return (
    <Card>
      <CardHeader>Welcome</CardHeader>
      <CardContent>
        <Input placeholder="Enter name..." />
        <Button variant="primary">Submit</Button>
      </CardContent>
    </Card>
  );
}
```

## Component API

### Actions
- **Button** — `variant: "primary" | "secondary" | "ghost" | "inverted"`, `size: "sm" | "md" | "lg"`
- **Link** — `variant: "default" | "muted" | "underline"`

### Forms
- **Input** — `type`, `placeholder`, `error`, `disabled`, `forwardRef`
- **Label** — with optional required marker
- **Textarea** — `rows`, `resizable`, `disabled`, `forwardRef`
- **Checkbox** — `checked`, `onChange`, `disabled`
- **Radio** — `checked`, `onChange`, `disabled`
- **Switch** — `checked`, `onChange`, `disabled`
- **Select** — `options`, `value`, `onChange`
- **FormField** — compound component (Label + Input + error)

### Data Display
- **Badge** — `variant: "default" | "secondary" | "outline"`
- **Avatar** — `size: "sm" | "md" | "lg"`, `color`, `image`
- **Tag** — with optional remove button
- **Stat** — metric with optional trend indicator
- **Table** — `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`
- **Code** — inline and block variants with syntax highlighting support
- **Kbd** — keyboard shortcut display
- **Progress** — animated progress bar with percentage

### Feedback
- **Alert** — `variant: "default" | "outline" | "filled"`, optional title
- **Spinner** — `size: "sm" | "md" | "lg"`
- **Skeleton** — shimmer loading placeholder

### Navigation
- **Breadcrumb** — with custom separator
- **Tabs** — `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`

### Layout
- **Card** — `Card`, `CardHeader`, `CardContent`, `CardFooter`
- **Separator** — horizontal or vertical
- **Stack** — `direction: "row" | "col"`, `gap`, alignment utilities

## Development

Requires `gus-ui-tokens` to be built locally first:

```bash
# 1. Build tokens
cd ../gus-ui-tokens && npm install && npm run build

# 2. Install and build library
cd ../gus-ui-library && npm install && npm run build
```
