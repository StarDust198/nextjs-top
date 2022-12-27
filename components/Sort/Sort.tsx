import { SortEnum, SortProps } from './Sort.props';
import styles from './Sort.module.css';
import cn from 'classnames';
import { FC } from 'react';
import SortIcon from './sort.svg';

export const Sort: FC<SortProps> = ({
  sort,
  setSort,
  direction,
  changeDirection,
  className,
  ...props
}) => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <div id="sort" className="dNone">
        Сортировка
      </div>
      <button
        id="rating"
        onClick={(): void => {
          if (sort === SortEnum.price) setSort(SortEnum.rating);
          else changeDirection();
        }}
        className={cn({
          [styles.active]: sort === SortEnum.rating,
        })}
        aria-selected={sort === SortEnum.rating}
        aria-labelledby="sort rating"
      >
        <SortIcon
          className={cn(styles.sortIcon, {
            [styles.sortDown]: direction === 'down',
          })}
        />
        По&nbsp;рейтингу
      </button>
      <button
        id="price"
        onClick={(): void => {
          if (sort === SortEnum.rating) setSort(SortEnum.price);
          else changeDirection();
        }}
        className={cn({
          [styles.active]: sort === SortEnum.price,
        })}
        aria-selected={sort === SortEnum.price}
        aria-labelledby="sort price"
      >
        <SortIcon
          className={cn(styles.sortIcon, {
            [styles.sortDown]: direction === 'down',
          })}
        />
        По&nbsp;цене
      </button>
    </div>
  );
};
