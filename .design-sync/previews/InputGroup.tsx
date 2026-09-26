import { InputGroup } from '@gusvega/ui';

const wrap = { width: 280 } as const;

export const Price = () => (
  <div style={wrap}>
    <InputGroup prefix="$" suffix="USD" placeholder="0.00" value="1,299.00" onChange={() => {}} />
  </div>
);

export const Website = () => (
  <div style={wrap}>
    <InputGroup prefix="https://" placeholder="yoursite.com" value="gusvega.dev" onChange={() => {}} />
  </div>
);

export const Search = () => (
  <div style={wrap}>
    <InputGroup prefix="⌕" placeholder="Search components…" onChange={() => {}} />
  </div>
);
