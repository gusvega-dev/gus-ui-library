# @gusvega-dev/gus-ui-library

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
