import { ReactNode, DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  // rounded?: boolean;
  color?: 'white' | 'blue';
  children: ReactNode;
}
