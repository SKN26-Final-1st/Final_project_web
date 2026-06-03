import { Button, Col, Form, Input, Row, Select, Space, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { CompanyChoices, CompanyProfile } from '../../api/adapters';
import type { ShowAlert } from '../../types/app';

const { TextArea } = Input;

type CompanyProfileFormProps = {
  company: CompanyProfile;
  choices: CompanyChoices;
  showAlert: ShowAlert;
};

export function CompanyProfileForm({ company, choices, showAlert }: CompanyProfileFormProps) {
  return (
    <Form layout="vertical" initialValues={company}>
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item label="회사명" name="name">
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="산업군" name="industry">
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="규모" name="size">
            <Select options={choices.employeeSizeOptions.map((value) => ({ value }))} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="위치" name="location">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="회사 소개" name="introduction">
        <TextArea rows={5} />
      </Form.Item>
      <Form.Item label="핵심 가치">
        <Space wrap>
          {company.values.map((value) => (
            <Tag className="large-tag" closable key={value}>
              {value}
            </Tag>
          ))}
          <Button
            icon={<PlusOutlined />}
            size="small"
            onClick={() =>
              showAlert({
                type: 'info',
                message: '핵심 가치 추가 입력은 API 연동 단계에서 저장됩니다.',
              })
            }
          >
            태그 추가
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
