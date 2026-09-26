---
"@gusvega/ui": minor
---

Improve Combobox behavior and form accessibility without removing existing APIs.

- Fix Combobox closing on the first click; add keyboard navigation, ARIA relationships, controlled value, disabled/read-only states, native form value, exported types, and semantic theme colors.
- Connect direct FormField children to labels, required state, hints, and errors automatically.
- Remove conflicting default/error border utilities from Input and Textarea.
- Keep useTheme consumers synchronized with OS theme changes, validate saved modes, tolerate unavailable storage, and render deterministic initial theme context.
- Add optional line wrapping to Code blocks.
- Add component guides, regression tests, and TypeScript/test gates to pull requests and releases.
