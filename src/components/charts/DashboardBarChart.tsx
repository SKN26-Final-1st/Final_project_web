import { useMemo } from 'react';
import type { ThemeMode } from '../../types/app';
import { type TrendChartData, toBarChartOption } from './chartAdapters';
import { EChart } from './EChart';
import { getChartTheme } from './chartTheme';

type DashboardBarChartProps = {
  ariaLabel: string;
  data: TrendChartData;
  mode: ThemeMode;
};

export function DashboardBarChart({ ariaLabel, data, mode }: DashboardBarChartProps) {
  const option = useMemo(() => toBarChartOption(data, getChartTheme(mode)), [data, mode]);

  return <EChart ariaLabel={ariaLabel} className="dashboard-bar-chart" option={option} renderer="svg" />;
}
