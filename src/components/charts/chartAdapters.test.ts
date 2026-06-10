import { toDonutChartOption } from './chartAdapters';
import type { ChartThemeTokens } from './chartTheme';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

type GraphicText = {
  top: string;
  style: {
    fontSize: number;
    text: string;
  };
};

const theme: ChartThemeTokens = {
  mode: 'light',
  primary: '#2563EB',
  primarySoft: 'rgba(37, 99, 235, 0.12)',
  accent: '#0D9488',
  track: 'rgba(13, 148, 136, 0.18)',
  warning: '#d97706',
  text: '#111827',
  muted: 'rgba(17, 24, 39, 0.6)',
  surface: '#ffffff',
  border: 'rgba(17, 24, 39, 0.1)',
  tooltipBg: '#ffffff',
};

const option = toDonutChartOption(
  {
    centerValue: 86,
    centerLabel: '평균 적합도',
    segments: [
      { label: '적합', value: 86, colorKey: 'primary' },
      { label: '검토 필요', value: 14, colorKey: 'track' },
    ],
  },
  theme,
);

const [centerValue, centerLabel] = option.graphic as GraphicText[];

assert(centerValue.style.fontSize <= 28, 'compact donut center value should fit inside the ring');
assert(centerLabel.style.fontSize <= 11, 'compact donut center label should stay secondary');
assert(centerValue.top === '40%', 'compact donut value should sit above the center line');
assert(centerLabel.top === '63%', 'compact donut label should sit below the value without overlap');
