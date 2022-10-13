import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import cn from 'classnames';
import { FC } from 'react';

export const Button: FC<ButtonProps> = ({
  appearance,
  children,
  className,
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
    </button>
  );
};
