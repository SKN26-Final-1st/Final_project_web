import { Card, Statistic } from 'antd';
import type { MetricItem } from '../../api/adapters';

export function MetricCard({ item }: { item: MetricItem }) {
  return (
    <Card className="metric-card">
      <Statistic title={item.label} value={item.value} suffix={item.suffix} />
      <span className="metric-change">{item.change}</span>
    </Card>
  );
}
