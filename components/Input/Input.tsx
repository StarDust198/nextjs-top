import { InputProps } from './Input.props';
import styles from './Input.module.css';
import cn from 'classnames';
import { FC } from 'react';

export const Input: FC<InputProps> = ({ className, ...props }) => {
  return <input className={cn(styles.input, className)} {...props} />;
};
