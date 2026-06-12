# @gusvega/ui

## 1.0.0

### Major Changes

- Release GUS UI 1.0.0 as the first stable version of the component library.

  This release formalizes the public package metadata, MIT license, GitHub source
  links, npm package homepage, typed exports, compiled CSS entrypoints, and
  documentation surface for production use.

## 0.5.0

### Minor Changes

- Next.js App Router compatibility, SSR fix, component rewrites, and accessibility improvements.

  **Breaking changes**

  - `DropZone.onDrop` now receives `File[]` instead of `FileList`
  - `CommandPalette.commands` items now require an `id: string` field and use `action` instead of a top-level `onSelect` prop

  **New features**

  - `'use client'` directives on all 39 interactive components — works out of the box in Next.js App Router
  - `ThemeProvider` is now SSR-safe — starts from `defaultColorMode` on server, syncs localStorage after mount to prevent hydration mismatches
  - `sideEffects: ["./dist/style.css"]` in package.json — tree-shaking now works correctly
  - `DatePicker` — label, hint, error with ARIA, `min`/`max`, `disabled`, `required`, semantic tokens
  - `TimePicker` — label, hint, error with ARIA, `min`/`max`, `step`, `disabled`, `required`, semantic tokens
  - `DropZone` — keyboard accessible (Enter/Space), file list with sizes, per-file removal, `maxSize` validation
  - `FileUpload` — multi-file list, `maxFiles` guard, `maxSize` per-file validation, progress bar slot, per-file removal
  - `CommandPalette` — grouped commands, keyboard navigation (↑↓/Enter/Esc), shortcut badge display, description text, fuzzy search, full ARIA (combobox/listbox/option roles)

  **Bug fixes**

  - `Modal` — removed `aria-hidden="true"` on the dialog wrapper that was hiding content from assistive technology
  - `FormField` — label uses semantic `text-foreground`, errors use `text-destructive` with `role="alert"`, asterisk marked `aria-hidden`

  **Tests**

  - 11 new test files: Input, Alert, Toast, Select, Switch, Radio, Accordion, Drawer, FormField, Tooltip, Badge
  - 124 tests total across 15 files

## 0.4.7

### Patch Changes

- Revert sub-items styling - remove background container, keep simple left border design

## 0.4.6

### Patch Changes

- Improve sub-items spacing and add background color to distinguish sub-item section from main navigation

## 0.4.5

### Patch Changes

- Remove icons from Sidebar, improve spacing and positioning of sub items, use slate colors from ui-tokens

## 0.4.4

### Patch Changes

- Beautiful Tailwind CSS redesign of Sidebar component with gradients, improved hover states, and modern styling

## 0.4.3

### Patch Changes

- Improved Sidebar styling with gradients, better hover effects, and animations

## 0.4.2

### Patch Changes

- Include README.md in published package

## 0.4.1

### Patch Changes

- creating a side menu
