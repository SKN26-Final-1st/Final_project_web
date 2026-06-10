import { theme as antdTheme, type ThemeConfig } from 'antd';
import { palette } from '../data/mockData';
import type { ThemeMode } from '../types/app';

const fontFamily = 'Pretendard, Noto Sans KR, system-ui, sans-serif';

export function buildAppTheme(mode: ThemeMode): ThemeConfig {
  const isDark = mode === 'dark';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.13)' : 'rgba(17, 24, 39, 0.13)';

  return {
    algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: palette.primary,
      colorInfo: palette.primary,
      colorSuccess: palette.accent,
      colorBgBase: isDark ? '#0b1220' : '#ffffff',
      colorBgContainer: isDark ? '#111827' : '#ffffff',
      colorBgElevated: isDark ? '#111827' : '#ffffff',
      colorBorder: borderColor,
      colorBorderSecondary: borderColor,
      colorTextBase: isDark ? '#ffffff' : palette.text,
      colorTextPlaceholder: isDark ? 'rgba(255, 255, 255, 0.44)' : 'rgba(17, 24, 39, 0.38)',
      fontFamily,
      borderRadius: 8,
      borderRadiusLG: 8,
      borderRadiusSM: 6,
      controlHeight: 40,
    },
    components: {
      Button: {
        borderRadius: 8,
        controlHeight: 40,
      },
      Card: {
        borderRadiusLG: 8,
      },
      Input: {
        borderRadius: 8,
      },
      Select: {
        borderRadius: 8,
      },
      Table: {
        borderRadius: 8,
      },
    },
  };
}
