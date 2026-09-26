# GUS UI quality roadmap

## This change

A focused foundation upgrade based on the live docs audit: Combobox interactions and semantics, FormField associations, error borders, reliable theme context, readable code blocks, specific usage guides, and automated test/type/build gates.

## Next milestones

1. **Documentation site:** Apply the canonical CSS import and these guides to the separate site source. Replace generic API tables with component-specific props. Show preview/code tabs, all major states, and direct source links.
2. **Visual system:** Review token contrast in light/dark themes, standardize control heights and focus rings, and demonstrate components together in a complete settings form and data table. Preserve the established monochrome direction until a new visual direction is selected.
3. **Accessibility coverage:** Test overlays, selection widgets, charts, and file controls with keyboard, touch, screen readers, and automated accessibility scans. Add meaningful regression tests for each repaired behavior.
4. **Distribution compatibility:** Test a packed consumer app with Vite and Next.js, React versions matching declared peers, optional chart dependencies, and emitted client boundaries. Current declarations of React 17+ and complete App Router compatibility need a consumer matrix; source-level tests alone do not establish those claims.
5. **Release discipline:** Run checks before publishing, publish a Changesets release with migration notes when needed, and keep npm, repository guides, and the live docs aligned.

The source repository currently contains library code and Markdown documentation. The live documentation site's implementation is not part of this checkout. This change does not update or publish that site.
