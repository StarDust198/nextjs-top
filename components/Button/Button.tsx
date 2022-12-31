import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import ArrowIcon from './arrow.svg';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

export const Button = forwardRef(
  (
    { appearance, children, className, arrow = 'none', ...props }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        className={cn(styles.button, className, {
          [styles.primary]: appearance === 'primary',
          [styles.ghost]: appearance === 'ghost',
        })}
        ref={ref}
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
  }
);
