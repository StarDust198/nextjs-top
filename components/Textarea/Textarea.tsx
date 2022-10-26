import { TextareaProps } from './Textarea.props';
import styles from './Textarea.module.css';
import cn from 'classnames';
import { FC } from 'react';

export const Textarea: FC<TextareaProps> = ({ className, ...props }) => {
  return <textarea className={cn(styles.textarea, className)} {...props} />;
};
