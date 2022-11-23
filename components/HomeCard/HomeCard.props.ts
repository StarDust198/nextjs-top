import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { MenuItem } from '../../interfaces/menu.interface';

export interface HomeCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  cardInfo: MenuItem;
}
