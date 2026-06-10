import { palette } from '../../data/mockData';
import type { ThemeMode } from '../../types/app';

export type ChartColorKey = 'primary' | 'accent' | 'track' | 'warning';

export type ChartThemeTokens = {
  mode: ThemeMode;
  primary: string;
  primarySoft: string;
  accent: string;
  track: string;
  warning: string;
  text: string;
  muted: string;
  surface: string;
  border: string;
  tooltipBg: string;
};

export function getChartTheme(mode: ThemeMode): ChartThemeTokens {
  const isDark = mode === 'dark';

  return {
    mode,
    primary: palette.primary,
    primarySoft: isDark ? 'rgba(37, 99, 235, 0.28)' : 'rgba(37, 99, 235, 0.12)',
    accent: palette.accent,
    track: isDark ? 'rgba(13, 148, 136, 0.18)' : 'rgba(13, 148, 136, 0.18)',
    warning: '#d97706',
    text: isDark ? '#ffffff' : palette.text,
    muted: isDark ? 'rgba(255, 255, 255, 0.68)' : 'rgba(17, 24, 39, 0.6)',
    surface: isDark ? '#111827' : palette.card,
    border: isDark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(17, 24, 39, 0.1)',
    tooltipBg: isDark ? 'rgba(11, 18, 32, 0.96)' : '#ffffff',
  };
}

export function resolveChartColor(colorKey: ChartColorKey, theme: ChartThemeTokens) {
  return theme[colorKey];
}
