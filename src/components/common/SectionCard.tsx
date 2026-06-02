import type { ReactNode } from 'react';
import { Card } from 'antd';

type SectionCardProps = {
  children: ReactNode;
  className?: string;
  title?: ReactNode;
  extra?: ReactNode;
};

export function SectionCard({ children, className, title, extra }: SectionCardProps) {
  return (
    <Card className={className} title={title} extra={extra}>
      {children}
    </Card>
  );
}
