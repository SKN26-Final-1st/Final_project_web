import type { CSSProperties } from 'react';

export function DonutChart({ value }: { value: number }) {
  return (
    <div className="donut-wrap">
      <div className="donut" style={{ '--value': `${value}%` } as CSSProperties}>
        <div>
          <strong>{value}%</strong>
          <span>평균 적합도</span>
        </div>
      </div>
    </div>
  );
}
