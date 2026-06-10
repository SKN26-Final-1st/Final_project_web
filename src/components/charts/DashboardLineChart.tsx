import { useMemo } from 'react';
import type { ThemeMode } from '../../types/app';
import { type TrendChartData, toLineChartOption } from './chartAdapters';
import { EChart } from './EChart';
import { getChartTheme } from './chartTheme';

type DashboardLineChartProps = {
  ariaLabel: string;
  data: TrendChartData;
  mode: ThemeMode;
};

export function DashboardLineChart({ ariaLabel, data, mode }: DashboardLineChartProps) {
  const option = useMemo(() => toLineChartOption(data, getChartTheme(mode)), [data, mode]);

  return <EChart ariaLabel={ariaLabel} className="dashboard-line-chart" option={option} renderer="svg" />;
}
