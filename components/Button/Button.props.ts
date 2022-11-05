import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface ButtonProps
  // Omit<
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  // , 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'>
  appearance: 'primary' | 'ghost';
  children: ReactNode;
  arrow?: 'right' | 'down' | 'none';
}
