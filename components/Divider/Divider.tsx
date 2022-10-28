import { DividerProps } from './Divider.props';
import styles from './Divider.module.css';
import cn from 'classnames';
import { FC } from 'react';

export const Divider: FC<DividerProps> = ({ className, ...props }) => {
  return <hr className={cn(styles.hr, className)} {...props} />;
};
