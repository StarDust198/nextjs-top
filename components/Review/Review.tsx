import { ReviewProps } from './Review.props';
import styles from './Review.module.css';
import cn from 'classnames';
import { FC } from 'react';
import UserIcon from './user.svg';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Rating } from '../Rating/Rating';

export const Review: FC<ReviewProps> = ({ review, className, ...props }) => {
  const { name, title, createdAt, description, rating } = review;

  return (
    <div className={cn(styles.review, className)} {...props}>
      <UserIcon className={styles.user} />
      <div>
        <span className={styles.name}>{name}:</span>&nbsp;&nbsp;
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.date}>
        {format(new Date(createdAt), 'dd MMMM yyyy', { locale: ru })}
      </div>
      <div className={styles.rating}>
        <Rating rating={rating} />
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};
