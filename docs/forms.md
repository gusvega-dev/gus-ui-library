# Accessible forms

## Labels, hints, and validation

FormField connects a single direct input component to its label and help text. It preserves an existing child ID and `aria-describedby`, or generates an ID when needed. `htmlFor` overrides that ID. `required` sets the actual control's required state as well as the visual marker. Errors replace hints and are announced with `role="alert"`.

```tsx
import { FormField, Input, Textarea } from '@gusvega/ui';

<FormField label="Project name" required error="Enter a project name.">
  <Input error="Enter a project name." autoComplete="off" />
</FormField>

<FormField label="Description" hint="Explain what your project does.">
  <Textarea rows={4} />
</FormField>
```

The field error sets the child's `aria-invalid` and connects the visible message. Pass `error` to Input, Textarea, Select, or Combobox as well when you want that control's error border. These primitives do not render their own error message, allowing flexible layouts without duplicate announcements.

### Supported composition

Use one direct child that forwards `id`, `required`, `aria-invalid`, and `aria-describedby` to its focusable input. Input, Textarea, Select, and Combobox support this pattern. A fragment, multiple children, or a wrapper around the input cannot be wired automatically. For those layouts, connect the actual input explicitly:

```tsx
<label htmlFor="email">Email</label>
<div className="custom-input-layout">
  <Input id="email" type="email" aria-describedby="email-help" />
</div>
<p id="email-help">We will send project updates here.</p>
```

Do not use FormField as a group label for multiple checkboxes/radios; use a fieldset and legend. A required asterisk is presentation, while the input's native required attribute provides the validation contract.

## State checklist for examples

Show default, focused, filled, disabled, required, hint, and invalid states. Error text should explain how to recover. Test label clicks, Tab order, Enter behavior, and form submission. Avoid placeholder-only labels and color-only error explanations.
