import { TagProps } from './Tag.props';
import styles from './Tag.module.css';
import cn from 'classnames';
import { FC } from 'react';

export const Tag: FC<TagProps> = ({
  size = 'm',
  color = 'ghost',
  children,
  className,
  href,
  ...props
}) => {
  return (
    <div
      className={cn(styles.tag, className, {
        [styles.s]: size === 's',
        [styles.m]: size === 'm',
        [styles.green]: color === 'green',
        [styles.red]: color === 'red',
        [styles.ghost]: color === 'ghost',
        [styles.primary]: color === 'primary',
        [styles.gray]: color === 'gray',
      })}
      {...props}
    >
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
  );
};
