import { Col, Row } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { SectionCard } from '../common/SectionCard';
import type { DashboardTask } from '../../api/adapters';

type TaskListPanelProps = {
  tasks: DashboardTask[];
};

export function TaskListPanel({ tasks }: TaskListPanelProps) {
  return (
    <SectionCard title="오늘의 작업" className="section-row">
      <Row gutter={[16, 16]}>
        {tasks.map((task) => (
          <Col xs={24} md={12} xl={6} key={task.id}>
            <div className="task-item">
              <CheckCircleOutlined />
              <span>{task.title}</span>
            </div>
          </Col>
        ))}
      </Row>
    </SectionCard>
  );
}
