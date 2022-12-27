import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface ModalProps
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'
  > {
  children: ReactNode;
  isOpen: boolean;
}
