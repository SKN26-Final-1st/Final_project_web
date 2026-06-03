import { Tag } from 'antd';
import type { StatusCode } from '../data/apiMockData';

const statusColorByCode: Partial<Record<StatusCode, string>> = {
  analysis_done: 'green',
  interview_recommended: 'green',
  valid: 'green',
  normal: 'green',
  analysis_pending: 'blue',
  needs_followup: 'blue',
  draft: 'default',
  missing_answer: 'orange',
  on_hold: 'gold',
};

export function statusTag(label: string, statusCode?: StatusCode) {
  return <Tag color={statusCode ? statusColorByCode[statusCode] : 'default'}>{label}</Tag>;
}
