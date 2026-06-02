import { Tag } from 'antd';

export function statusTag(status: string) {
  if (status.includes('완료') || status.includes('추천') || status === '정상') {
    return <Tag color="success">{status}</Tag>;
  }
  if (status.includes('대기') || status.includes('질문')) {
    return <Tag color="processing">{status}</Tag>;
  }
  if (status.includes('누락') || status.includes('보류')) {
    return <Tag color="warning">{status}</Tag>;
  }
  return <Tag>{status}</Tag>;
}
