import { Col, Row } from 'antd';
import { MetricCard } from '../common/MetricCard';
import type { MetricItem } from '../../api/adapters';

type DashboardMetricsProps = {
  metrics: MetricItem[];
};

export function DashboardMetrics({ metrics }: DashboardMetricsProps) {
  return (
    <Row gutter={[22, 22]}>
      {metrics.map((item) => (
        <Col xs={24} sm={12} xl={6} key={item.label}>
          <MetricCard item={item} />
        </Col>
      ))}
    </Row>
  );
}
