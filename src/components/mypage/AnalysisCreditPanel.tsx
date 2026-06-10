import { Button, Progress } from 'antd';
import { CreditCardOutlined } from '@ant-design/icons';
import { palette } from '../../data/mockData';
import type { ShowAlert } from '../../types/app';

type AnalysisCreditPanelProps = {
  creditPercent: number;
  showAlert: ShowAlert;
};

export function AnalysisCreditPanel({ creditPercent, showAlert }: AnalysisCreditPanelProps) {
  const isLowCredit = creditPercent < 30;

  return (
    <div className="analysis-credit-panel">
      <div className="analysis-credit-heading">
        <span className="analysis-credit-icon">
          <CreditCardOutlined />
        </span>
        <div>
          <strong>분석 크레딧</strong>
          <small>{isLowCredit ? '충전 문의가 필요한 상태입니다.' : '월간 분석 가능량이 안정적입니다.'}</small>
        </div>
      </div>
      <div className="analysis-credit-meter">
        <span>
          <strong>{creditPercent}%</strong>
          <small>월간 잔여</small>
        </span>
        <Progress percent={creditPercent} strokeColor={isLowCredit ? '#d97706' : palette.accent} />
      </div>
      <Button
        type="primary"
        ghost
        onClick={() => showAlert({ type: 'info', message: '크레딧 충전 문의 상태를 표시했습니다.' })}
      >
        충전 문의
      </Button>
    </div>
  );
}
