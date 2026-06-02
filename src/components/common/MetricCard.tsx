import { Card, Statistic } from 'antd';
import type { metrics } from '../../data/mockData';

type MetricItem = (typeof metrics)[number];

export function MetricCard({ item }: { item: MetricItem }) {
  return (
    <Card className="metric-card">
      <Statistic title={item.label} value={item.value} suffix={item.suffix} />
      <span className="metric-change">{item.change}</span>
    </Card>
  );
}
