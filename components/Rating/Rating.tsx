import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import { FC, KeyboardEvent, useEffect, useState } from 'react';
import StarIcon from './star.svg';

export const Rating: FC<RatingProps> = ({
  rating,
  isEditable = false,
  setRating,
  ...props
}) => {
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
          <StarIcon
            tabIndex={isEditable ? 0 : -1}
            onKeyDown={(e: KeyboardEvent<SVGElement>): void =>
              onKeyPress(i + 1, e)
            }
          />
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

  const onKeyPress = (i: number, e: KeyboardEvent<SVGElement>): void => {
    if ((e.code !== 'Space' && e.code !== 'Enter') || !setRating) return;
    setRating(i);
  };

  return (
    <div {...props}>
      {ratingArr.map((r, i) => (
        <span key={i}>{r}</span>
      ))}
    </div>
  );
};
