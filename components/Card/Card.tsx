import { CardProps } from './Card.props';
import styles from './Card.module.css';
import cn from 'classnames';
import { FC } from 'react';

export const Card: FC<CardProps> = ({
  color = 'white',
  // rounded = false,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(className, styles.card, {
        [styles.blue]: color === 'blue',
        // [styles.rounded]: rounded,
      })}
      {...props}
    >
      {children}
    </div>
  );
};
