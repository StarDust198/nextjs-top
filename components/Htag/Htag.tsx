import { HtagProps } from './Htag.props';
import styles from './Htag.module.css';
import { FC } from 'react';
import cn from 'classnames';

export const Htag: FC<HtagProps> = ({ className, tag, children, ...props }) => {
  switch (tag) {
    case 'h1':
      return (
        <h1 className={cn(styles.h1, className)} {...props}>
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2 className={cn(styles.h2, className)} {...props}>
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3 className={cn(styles.h3, className)} {...props}>
          {children}
        </h3>
      );
    default:
      return <>!header!</>;
  }
};
