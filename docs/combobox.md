# Combobox

Use Combobox when a user chooses one value from a searchable list. For a short list that does not need search, use the native Select component.

## Complete example

```tsx
'use client';

import { useState } from 'react';
import { Combobox, FormField } from '@gusvega/ui';
import type { ComboboxOption } from '@gusvega/ui';
import '@gusvega/ui/style.css';

const frameworks: ComboboxOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte', disabled: true },
];

export function FrameworkField() {
  const [framework, setFramework] = useState('react');
  return (
    <FormField label="Framework" hint="Choose the framework for your project.">
      <Combobox
        name="framework"
        options={frameworks}
        value={framework}
        onChange={setFramework}
        placeholder="Search frameworks…"
      />
    </FormField>
  );
}
```

Import CSS once in the application entry point. FormField gives its direct child a stable ID and connects the visible label and hint. `name` submits the selected option's value through a hidden input; search text is not submitted.

## API

| Prop | Type | Default | Behavior |
| --- | --- | --- | --- |
| `options` | `ComboboxOption[]` | Required | Unique `value`, visible `label`, optional `disabled`. |
| `value` | `string` | — | Controlled selection; update it in `onChange`. |
| `defaultValue` | `string` | `''` | Initial uncontrolled selection. |
| `onChange` | `(value: string) => void` | — | Called when an enabled option is selected. |
| `placeholder` | `string` | `'Search...'` | Search prompt. Use a visible label too. |
| `emptyMessage` | `string` | `'No options found'` | Announced empty result message. |
| `disabled` | `boolean` | `false` | Blocks interaction and omits the form value. |
| `readOnly` | `boolean` | `false` | Displays the value without opening the list. |
| `error` | `string` | — | Invalid border and `aria-invalid`; pair with a FormField message. |
| `name` | `string` | — | Native form field name for the selected value. |
| `id` | `string` | Generated | Input ID for a standalone Label. |
| `className` | `string` | `''` | Input styling hook. |
| `ref` | `Ref<HTMLInputElement>` | — | Focus the input or inspect its validity. |

Other supported native input attributes and focus/blur/key handlers are forwarded. The component owns its text value, role, autocomplete behavior, and list relationships. Use an `aria-label` when a visible label is not possible.

## Interaction contract

| Action | Result |
| --- | --- |
| Focus or click | Opens the list without toggling it closed. |
| Type | Filters labels, ignoring case. |
| Arrow Down / Arrow Up | Moves the active option, skipping disabled items. |
| Home / End while open | Moves to the first / last enabled option. |
| Enter with an active option | Selects it and closes the list without submitting the form. |
| Escape | Closes, restores the selected label, and leaves focus in the input. |
| Tab | Closes and continues normal page navigation. |
| Click outside | Closes without blocking the outside control. |

DOM focus remains in the input; `aria-activedescendant` identifies the active option. The list uses `listbox`/`option` semantics and selected/disabled attributes. Pointer and keyboard selection use the same callback. The popup uses semantic tokens for light, dark, and custom themes.

## Boundaries

Filtering is local. This component does not fetch remote results, virtualize large lists, create new options, or offer a built-in clear button. Reset a controlled selection by setting `value=""`. The popup is positioned within the component; avoid ancestors that clip overflow. Automated interaction tests do not replace manual screen reader or touch-device testing.
