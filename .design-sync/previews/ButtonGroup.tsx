import { ButtonGroup } from '@gusvega/ui';

export const Default = () => (
  <ButtonGroup
    buttons={[
      { label: 'Day', active: true },
      { label: 'Week' },
      { label: 'Month' },
      { label: 'Year' },
    ]}
  />
);

export const TwoOptions = () => (
  <ButtonGroup buttons={[{ label: 'List', active: true }, { label: 'Grid' }]} />
);
