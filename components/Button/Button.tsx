import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import ArrowIcon from './arrow.svg';
import cn from 'classnames';
import { FC } from 'react';

export const Button: FC<ButtonProps> = ({
  appearance,
  children,
  className,
  arrow = 'none',
  ...props
}) => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearance === 'primary',
        [styles.ghost]: appearance === 'ghost',
      })}
      {...props}
    >
      {children}
      {arrow !== 'none' && (
        <span
          className={cn(styles.arrow, {
            [styles.down]: arrow === 'down',
          })}
        >
          <ArrowIcon />
        </span>
      )}
    </button>
  );
};
