import { type ChartColorKey, type ChartThemeTokens, resolveChartColor } from './chartTheme';

export type DonutSummaryData = {
  centerValue: number;
  centerLabel: string;
  segments: {
    label: string;
    value: number;
    colorKey: ChartColorKey;
  }[];
};

export type DashboardChartOption = Record<string, unknown>;

export function toDonutChartOption(data: DonutSummaryData, theme: ChartThemeTokens): DashboardChartOption {
  return {
    animation: true,
    color: data.segments.map((segment) => resolveChartColor(segment.colorKey, theme)),
    tooltip: {
      trigger: 'item',
      backgroundColor: theme.tooltipBg,
      borderColor: theme.border,
      textStyle: {
        color: theme.text,
        fontFamily: 'Pretendard, Noto Sans KR, system-ui, sans-serif',
      },
      valueFormatter: (value: unknown) => `${value}%`,
    },
    legend: {
      show: false,
    },
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: '40%',
        silent: true,
        style: {
          text: `${data.centerValue}%`,
          fill: theme.text,
          fontSize: 27,
          fontWeight: 800,
          align: 'center',
          verticalAlign: 'middle',
        },
      },
      {
        type: 'text',
        left: 'center',
        top: '63%',
        silent: true,
        style: {
          text: data.centerLabel,
          fill: theme.muted,
          fontSize: 11,
          fontWeight: 700,
          align: 'center',
          verticalAlign: 'middle',
        },
      },
    ],
    series: [
      {
        name: data.centerLabel,
        type: 'pie',
        radius: ['58%', '80%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: true,
        clockwise: true,
        startAngle: 90,
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        emphasis: {
          scale: true,
          scaleSize: 4,
        },
        data: data.segments.map((segment) => ({
          name: segment.label,
          value: segment.value,
          itemStyle: {
            color: resolveChartColor(segment.colorKey, theme),
          },
        })),
      },
    ],
  };
}

export type TrendChartData = {
  labels: string[];
  values: number[];
  name: string;
  unit?: string;
};

export type DashboardTrendSource = TrendChartData & {
  key: string;
};

export function toTrendChartData(trend: DashboardTrendSource): TrendChartData {
  return {
    labels: trend.labels,
    values: trend.values,
    name: trend.name,
    unit: trend.unit,
  };
}

export function toLineChartOption(data: TrendChartData, theme: ChartThemeTokens): DashboardChartOption {
  return {
    animation: true,
    grid: {
      top: 18,
      right: 12,
      bottom: 28,
      left: 28,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: theme.tooltipBg,
      borderColor: theme.border,
      textStyle: {
        color: theme.text,
        fontFamily: 'Pretendard, Noto Sans KR, system-ui, sans-serif',
      },
      valueFormatter: (value: unknown) => `${value}${data.unit ?? ''}`,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.labels,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: theme.muted,
        fontSize: 11,
      },
    },
    yAxis: {
      type: 'value',
      splitNumber: 3,
      axisLabel: {
        color: theme.muted,
        fontSize: 11,
      },
      splitLine: {
        lineStyle: {
          color: theme.border,
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: data.name,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        lineStyle: {
          width: 4,
          color: theme.primary,
        },
        itemStyle: {
          color: theme.primary,
          borderColor: theme.surface,
          borderWidth: 2,
        },
        areaStyle: {
          color: theme.primarySoft,
        },
        data: data.values,
      },
    ],
  };
}

export function toBarChartOption(data: TrendChartData, theme: ChartThemeTokens): DashboardChartOption {
  return {
    animation: true,
    grid: {
      top: 18,
      right: 12,
      bottom: 28,
      left: 34,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: theme.tooltipBg,
      borderColor: theme.border,
      textStyle: {
        color: theme.text,
        fontFamily: 'Pretendard, Noto Sans KR, system-ui, sans-serif',
      },
      valueFormatter: (value: unknown) => `${value}${data.unit ?? ''}`,
    },
    xAxis: {
      type: 'category',
      data: data.labels,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: theme.muted,
        fontSize: 11,
      },
    },
    yAxis: {
      type: 'value',
      splitNumber: 3,
      axisLabel: {
        color: theme.muted,
        fontSize: 11,
      },
      splitLine: {
        lineStyle: {
          color: theme.border,
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: data.name,
        type: 'bar',
        barWidth: 11,
        roundCap: true,
        itemStyle: {
          color: theme.primary,
          borderRadius: [8, 8, 8, 8],
        },
        emphasis: {
          itemStyle: {
            color: theme.accent,
          },
        },
        data: data.values,
      },
    ],
  };
}
