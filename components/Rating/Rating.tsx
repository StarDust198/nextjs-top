import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import {
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  useEffect,
  useState,
} from 'react';
import StarIcon from './star.svg';

export const Rating = forwardRef(
  (
    {
      rating,
      isEditable = false,
      setRating,
      className,
      error,
      ...props
    }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArr, setRatingArr] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );

    useEffect(() => {
      constructRating(rating);
    }, [rating]);

    const constructRating = (currentRating: number): void => {
      const updatedArr = ratingArr.map((r: JSX.Element, i: number) => {
        return (
          <span
            className={cn(styles.star, {
              [styles.filled]: i < currentRating,
              [styles.editable]: isEditable,
            })}
            onMouseEnter={(): void => changeDisplay(i + 1)}
            onMouseLeave={(): void => changeDisplay(rating)}
            onClick={(): void => onClickStar(i + 1)}
          >
            <StarIcon />
          </span>
        );
      });
      setRatingArr(updatedArr);
    };

    const changeDisplay = (i: number): void => {
      if (!isEditable) return;
      constructRating(i);
    };

    const onClickStar = (i: number): void => {
      if (!isEditable || !setRating) return;
      setRating(i);
    };

    const onKeyPress = (e: KeyboardEvent): void => {
      if (
        !(
          e.code === 'ArrowRight' ||
          e.code === 'ArrowLeft' ||
          e.code === 'ArrowUp' ||
          e.code === 'ArrowDown'
        ) ||
        !setRating ||
        !isEditable
      )
        return;

      e.preventDefault();

      switch (e.code) {
        case 'ArrowRight':
        case 'ArrowUp':
          if (rating < 5) setRating(rating + 1);
          if (!rating) setRating(1);
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          if (rating > 1) setRating(rating - 1);
          break;
      }
    };

    return (
      <div
        className={cn(
          styles.ratingWrapper,
          {
            [styles.error]: error,
          },
          className
        )}
        tabIndex={isEditable ? 0 : -1}
        {...props}
        onKeyDown={onKeyPress}
        ref={ref}
        role={isEditable ? 'slider' : ''}
        aria-valuenow={rating}
        aria-valuemin={1}
        aria-valuemax={5}
        aria-label={isEditable ? 'укажите рейтинг' : 'рейтинг ' + rating}
        aria-invalid={!!error}
      >
        {ratingArr.map((r, i) => (
          <span key={i}>{r}</span>
        ))}
        {error && (
          <span role="alert" className={styles.errorMessage}>
            {error.message}
          </span>
        )}
      </div>
    );
  }
);
