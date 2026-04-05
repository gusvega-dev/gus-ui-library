import { defaultTheme, type GusTheme } from './defaultTheme';

type FontFamilyOverride = string | readonly string[];
type FontSizeOverride = string | readonly [string, { lineHeight?: string }];

export interface GusThemeOverrides {
  colors?: {
    black?: string;
    white?: string;
    neutral?: Partial<Record<keyof GusTheme['colors']['neutral'], string>>;
  };
  spacing?: Partial<Record<keyof GusTheme['spacing'], string>>;
  typography?: {
    fontFamily?: Partial<Record<keyof GusTheme['typography']['fontFamily'], FontFamilyOverride>>;
    fontSize?: Partial<Record<keyof GusTheme['typography']['fontSize'], FontSizeOverride>>;
    fontWeight?: Partial<Record<keyof GusTheme['typography']['fontWeight'], string>>;
  };
}

const toCssVarKey = (prefix: string, key: string) => `--gus-${prefix}-${key.replace(/\./g, '_')}`;

const toFontFamilyValue = (value: FontFamilyOverride): string => {
  if (typeof value === 'string') {
    return value;
  }

  return Array.from(value).join(', ');
};

const toFontSizeValue = (
  value: FontSizeOverride,
  fallbackLineHeight: string
): { size: string; lineHeight: string } => {
  if (typeof value === 'string') {
    return { size: value, lineHeight: fallbackLineHeight };
  }

  return {
    size: value[0],
    lineHeight: value[1]?.lineHeight ?? fallbackLineHeight,
  };
};

const normalizeRgbChannels = (value: string): string => {
  const trimmed = value.trim();

  if (/^\d+\s+\d+\s+\d+$/.test(trimmed)) {
    return trimmed;
  }

  const rgbMatch = trimmed.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);
  if (rgbMatch) {
    return `${rgbMatch[1]} ${rgbMatch[2]} ${rgbMatch[3]}`;
  }

  const hex = trimmed.replace(/^#/, '');
  if (/^[\da-f]{3}$/i.test(hex)) {
    return hex
      .split('')
      .map(char => parseInt(char + char, 16))
      .join(' ');
  }

  if (/^[\da-f]{6}$/i.test(hex)) {
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ].join(' ');
  }

  throw new Error(
    `Unsupported color value "${value}". Use a hex color like "#171717" or rgb() string.`
  );
};

export const createThemeVariables = (
  overrides: GusThemeOverrides = {}
): Record<`--${string}`, string> => {
  const theme = {
    colors: {
      ...defaultTheme.colors,
      ...overrides.colors,
      neutral: {
        ...defaultTheme.colors.neutral,
        ...overrides.colors?.neutral,
      },
    },
    spacing: {
      ...defaultTheme.spacing,
      ...overrides.spacing,
    },
    typography: {
      ...defaultTheme.typography,
      ...overrides.typography,
      fontFamily: {
        ...defaultTheme.typography.fontFamily,
        ...overrides.typography?.fontFamily,
      },
      fontSize: {
        ...defaultTheme.typography.fontSize,
        ...overrides.typography?.fontSize,
      },
      fontWeight: {
        ...defaultTheme.typography.fontWeight,
        ...overrides.typography?.fontWeight,
      },
    },
  };

  const variables: Record<`--${string}`, string> = {
    '--gus-color-black': normalizeRgbChannels(theme.colors.black),
    '--gus-color-white': normalizeRgbChannels(theme.colors.white),
  };

  for (const [key, value] of Object.entries(theme.colors.neutral)) {
    variables[toCssVarKey('color-neutral', key) as `--${string}`] = normalizeRgbChannels(value);
  }

  for (const [key, value] of Object.entries(theme.spacing)) {
    variables[toCssVarKey('space', key) as `--${string}`] = value;
  }

  for (const [key, value] of Object.entries(theme.typography.fontFamily)) {
    variables[toCssVarKey('font-family', key) as `--${string}`] = toFontFamilyValue(
      value as FontFamilyOverride
    );
  }

  for (const [key, value] of Object.entries(theme.typography.fontSize)) {
    const fallback = defaultTheme.typography.fontSize[key as keyof GusTheme['typography']['fontSize']][1]
      .lineHeight;
    const fontSize = toFontSizeValue(value, fallback);
    variables[toCssVarKey('font-size', key) as `--${string}`] = fontSize.size;
    variables[toCssVarKey('line-height', key) as `--${string}`] = fontSize.lineHeight;
  }

  for (const [key, value] of Object.entries(theme.typography.fontWeight)) {
    variables[toCssVarKey('font-weight', key) as `--${string}`] = value;
  }

  return variables;
};
