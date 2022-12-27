import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SortProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  sort: SortEnum;
  setSort: (sort: SortEnum) => void;
  changeDirection: () => void;
  direction: 'up' | 'down';
}

export enum SortEnum {
  rating,
  price,
}
