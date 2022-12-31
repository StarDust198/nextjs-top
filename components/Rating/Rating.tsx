import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import {
  ForwardedRef,
  forwardRef,
  Fragment,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import StarIcon from './star.svg';

export const Rating = forwardRef(
  (
    {
      rating,
      isEditable = false,
      setRating,
      error,
      tabIndex,
      ...props
    }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArr, setRatingArr] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
      constructRating(rating);
    }, [rating, tabIndex]);

    const computeFocus = (r: number, i: number): number => {
      if (!isEditable) {
        return -1;
      }
      if (!rating && i == 0) {
        return tabIndex ?? 0;
      }
      if (r == i + 1) {
        return tabIndex ?? 0;
      }
      return -1;
    };

    const constructRating = (currentRating: number): void => {
      const updatedArray = ratingArr.map((r: JSX.Element, i: number) => {
        return (
          <span
            className={cn(styles.star, {
              [styles.filled]: i < currentRating,
              [styles.editable]: isEditable,
            })}
            onMouseEnter={(): void => changeDispay(i + 1)}
            onMouseLeave={(): void => changeDispay(rating)}
            onClick={(): void => onClick(i + 1)}
            tabIndex={computeFocus(rating, i)}
            onKeyDown={handleKey}
            ref={(r): number => ratingArrayRef.current?.push(r)}
            role={isEditable ? 'slider' : ''}
            aria-invalid={error ? true : false}
            aria-valuenow={rating}
            aria-valuemax={5}
            aria-label={isEditable ? 'Укажите рейтинг' : 'рейтинг' + rating}
            aria-valuemin={1}
          >
            <StarIcon />
          </span>
        );
      });
      setRatingArr(updatedArray);
    };

    const changeDispay = (i: number): void => {
      if (!isEditable) {
        return;
      }
      constructRating(i);
    };

    const onClick = (i: number): void => {
      if (!isEditable || !setRating) {
        return;
      }
      setRating(i);
    };

    const handleKey = (e: KeyboardEvent): void => {
      if (!isEditable || !setRating) {
        return;
      }
      if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
        if (!rating) {
          setRating(1);
        } else {
          e.preventDefault();
          setRating(rating < 5 ? rating + 1 : 5);
        }
        ratingArrayRef.current[rating]?.focus();
      }
      if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
        e.preventDefault();
        setRating(rating > 1 ? rating - 1 : 1);
        ratingArrayRef.current[rating - 2]?.focus();
      }
    };

    return (
      <div
        {...props}
        ref={ref}
        className={cn(styles.ratingWrapper, {
          [styles.error]: error,
        })}
      >
        {ratingArr.map((r, i) => (
          <Fragment key={i}>{r}</Fragment>
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
