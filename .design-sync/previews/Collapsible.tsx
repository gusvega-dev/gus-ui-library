import { Collapsible } from '@gusvega/ui';

const wrap = { width: 340 } as const;

export const Open = () => (
  <div style={wrap}>
    <Collapsible title="Advanced settings" defaultOpen>
      Configure caching, retries, and timeouts for this endpoint.
    </Collapsible>
  </div>
);

export const Closed = () => (
  <div style={wrap}>
    <Collapsible title="What's included?">
      Everything in Pro, plus SSO and audit logs.
    </Collapsible>
  </div>
);
