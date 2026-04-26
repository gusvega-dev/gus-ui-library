import React from 'react';

export type AspectRatioPreset = '1/1' | '4/3' | '16/9' | '21/9' | '3/4' | '9/16';

export interface AspectRatioProps {
  /** Numeric ratio (width / height) or a preset string */
  ratio?: number | AspectRatioPreset;
  children: React.ReactNode;
  className?: string;
}

const presetRatios: Record<AspectRatioPreset, number> = {
  '1/1':  1,
  '4/3':  4 / 3,
  '16/9': 16 / 9,
  '21/9': 21 / 9,
  '3/4':  3 / 4,
  '9/16': 9 / 16,
};

export const AspectRatio: React.FC<AspectRatioProps> = ({
  ratio = '16/9',
  children,
  className = '',
}) => {
  const numericRatio =
    typeof ratio === 'string' ? presetRatios[ratio] ?? 16 / 9 : ratio;

  return (
    <div
      className={['relative w-full overflow-hidden', className].filter(Boolean).join(' ')}
      style={{ paddingBottom: `${(1 / numericRatio) * 100}%` }}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
};

export default AspectRatio;
