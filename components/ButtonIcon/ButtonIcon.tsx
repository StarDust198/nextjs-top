import { ButtonIconProps, icons } from './ButtonIcon.props';
import styles from './ButtonIcon.module.css';
import cn from 'classnames';
import { FC } from 'react';

export const ButtonIcon: FC<ButtonIconProps> = ({
  icon,
  appearance,
  className,
  ...props
}) => {
  const IconComp = icons[icon];

  return (
    <button
      className={cn(styles.buttonIcon, className, {
        [styles.primary]: appearance === 'primary',
        [styles.white]: appearance === 'white',
      })}
      {...props}
    >
      <IconComp />
    </button>
  );
};
