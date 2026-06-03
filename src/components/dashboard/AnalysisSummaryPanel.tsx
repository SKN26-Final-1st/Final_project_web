import { Divider, List } from 'antd';
import { DonutChart } from '../charts/DonutChart';
import { SectionCard } from '../common/SectionCard';
import type { AnalysisSummary, InsightCard } from '../../api/adapters';
import type { ThemeMode } from '../../types/app';

type AnalysisSummaryPanelProps = {
  analysisSummary: AnalysisSummary;
  insightCards: InsightCard[];
  mode: ThemeMode;
};

export function AnalysisSummaryPanel({ analysisSummary, insightCards, mode }: AnalysisSummaryPanelProps) {
  return (
    <SectionCard title="분석 요약">
      <DonutChart data={analysisSummary} mode={mode} />
      <Divider />
      <List
        dataSource={insightCards}
        renderItem={(item) => (
          <List.Item>
            <div className={`insight-dot ${item.tone}`} />
            <List.Item.Meta title={item.title} description={item.detail} />
          </List.Item>
        )}
      />
    </SectionCard>
  );
}
