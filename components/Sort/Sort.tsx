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
        Сортировкa
        {direction === 'down' ? 'По нарастанию' : 'По убыванию'}
      </div>
      <div id="price" className="dNone">
        По цене
      </div>
      <div id="rating" className="dNone">
        По рейтингу
      </div>

      <button
        onClick={(): void => {
          if (sort === SortEnum.price) setSort(SortEnum.rating);
          else changeDirection();
        }}
        className={cn({
          [styles.active]: sort === SortEnum.rating,
        })}
        aria-selected={sort === SortEnum.rating}
        aria-labelledby="sort rating direction"
      >
        <SortIcon
          className={cn(styles.sortIcon, {
            [styles.sortDown]: direction === 'down',
          })}
        />
        По&nbsp;рейтингу
      </button>
      <button
        onClick={(): void => {
          if (sort === SortEnum.rating) setSort(SortEnum.price);
          else changeDirection();
        }}
        className={cn({
          [styles.active]: sort === SortEnum.price,
        })}
        aria-selected={sort === SortEnum.price}
        aria-labelledby="sort price direction"
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
