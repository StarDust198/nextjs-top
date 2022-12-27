import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ProductDetailsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  contents: string;
  closeModal: () => void;
}
