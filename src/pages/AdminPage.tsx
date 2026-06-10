import { Button, Col, Progress, Row, Space, Table, Tag, type TableProps } from 'antd';
import {
  CreditCardOutlined,
  LockOutlined,
  PlusOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { PageTitle } from '../components/common/PageTitle';
import { SectionCard } from '../components/common/SectionCard';
import type { AdminData, AdminMember } from '../api/adapters';
import type { Navigate, ShowAlert } from '../types/app';
import { statusTag } from '../utils/statusTag';

type AdminPageProps = {
  admin: AdminData;
  navigate: Navigate;
  showAlert: ShowAlert;
};

const memberColumns: TableProps<AdminMember>['columns'] = [
  {
    title: '담당자',
    dataIndex: 'name',
    key: 'name',
    render: (_, member) => (
      <div className="admin-member-cell">
        <strong>{member.name}</strong>
        <span>{member.email}</span>
      </div>
    ),
  },
  {
    title: '역할',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: '범위',
    dataIndex: 'scope',
    key: 'scope',
  },
  {
    title: '상태',
    dataIndex: 'status',
    key: 'status',
    render: (_, member) => statusTag(member.status, member.statusCode),
  },
  {
    title: '최근 활동',
    dataIndex: 'lastActive',
    key: 'lastActive',
  },
];

export function AdminPage({ admin, navigate, showAlert }: AdminPageProps) {
  return (
    <div className="admin-page">
      <PageTitle
        eyebrow="Admin"
        title="HR 관리자"
        description={`${admin.companyName}의 HR 담당자, 권한, 크레딧과 채용 운영 상태를 관리합니다.`}
        actions={
          <Space wrap>
            <Button icon={<SettingOutlined />} onClick={() => navigate('/company')}>
              회사 설정
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => showAlert({ type: 'info', message: 'HR 담당자 초대 목업을 표시했습니다.' })}
            >
              담당자 초대
            </Button>
          </Space>
        }
      />

      <Row gutter={[24, 24]}>
        {admin.summary.map((item) => (
          <Col xs={24} sm={12} xl={6} key={item.label}>
            <section className={`admin-summary-card ${item.tone}`}>
              <span className="admin-summary-icon" aria-hidden="true">
                {item.label.includes('크레딧') ? <CreditCardOutlined /> : <TeamOutlined />}
              </span>
              <div>
                <span>{item.label}</span>
                <strong>
                  {item.value}
                  {item.suffix}
                </strong>
                <small>{item.helper}</small>
              </div>
            </section>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} xl={16}>
          <SectionCard
            title="HR 담당자 관리"
            extra={
              <Button type="link" onClick={() => showAlert({ type: 'info', message: '권한 변경 내역을 불러왔습니다.' })}>
                변경 내역
              </Button>
            }
          >
            <Table<AdminMember>
              className="admin-member-table"
              columns={memberColumns}
              dataSource={admin.members}
              pagination={false}
              rowKey="key"
              scroll={{ x: 760 }}
            />
          </SectionCard>
        </Col>

        <Col xs={24} xl={8}>
          <SectionCard title="크레딧 / 구독">
            <div className="admin-credit-panel">
              <div className="admin-credit-head">
                <span>
                  <CreditCardOutlined />
                  분석 크레딧
                </span>
                <strong>{admin.credit.remaining}pt</strong>
              </div>
              <Progress percent={admin.credit.percent} />
              <div className="admin-credit-meta">
                <span>{admin.credit.subscriptionStatus}</span>
                <small>{admin.credit.expiresAt} 만료</small>
              </div>
              <Button block onClick={() => showAlert({ type: 'info', message: '크레딧 충전 문의를 접수했습니다.' })}>
                충전 문의
              </Button>
            </div>
          </SectionCard>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} xl={15}>
          <SectionCard title="권한 그룹">
            <div className="admin-permission-grid">
              {admin.permissions.map((permission) => (
                <article className="admin-permission-card" key={permission.key}>
                  <div className="admin-permission-head">
                    <span aria-hidden="true">
                      {permission.key === 'admin' ? <SafetyCertificateOutlined /> : <LockOutlined />}
                    </span>
                    <div>
                      <strong>{permission.role}</strong>
                      <p>{permission.description}</p>
                    </div>
                  </div>
                  <Space wrap>
                    {permission.permissions.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </Space>
                </article>
              ))}
            </div>
          </SectionCard>
        </Col>

        <Col xs={24} xl={9}>
          <SectionCard title="채용 운영 현황">
            <div className="admin-ops-list">
              <div>
                <span>진행 중 JD</span>
                <strong>{admin.operatingStatus.activeJobs}건</strong>
              </div>
              <div>
                <span>검토 대기 지원자</span>
                <strong>{admin.operatingStatus.pendingReviews}명</strong>
              </div>
              <div>
                <span>분석 처리 중</span>
                <strong>{admin.operatingStatus.processingResumes}명</strong>
              </div>
              <div>
                <span>평균 분석 점수</span>
                <strong>{admin.operatingStatus.averageScore}점</strong>
              </div>
            </div>
          </SectionCard>
        </Col>
      </Row>
    </div>
  );
}
