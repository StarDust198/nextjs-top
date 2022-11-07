import { SortEnum, SortProps } from './Sort.props';
import styles from './Sort.module.css';
import cn from 'classnames';
import { FC } from 'react';
import SortIcon from './sort.svg';

export const Sort: FC<SortProps> = ({ sort, setSort, className, ...props }) => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <div id="sort" className="dNone">
        Сортировка
      </div>
      <button
        id="rating"
        onClick={(): void => setSort(SortEnum.rating)}
        className={cn({
          [styles.active]: sort === SortEnum.rating,
        })}
        aria-selected={sort === SortEnum.rating}
        aria-labelledby="sort rating"
      >
        <SortIcon className={styles.sortIcon} />
        По&nbsp;рейтингу
      </button>
      <button
        id="price"
        onClick={(): void => setSort(SortEnum.price)}
        className={cn({
          [styles.active]: sort === SortEnum.price,
        })}
        aria-selected={sort === SortEnum.price}
        aria-labelledby="sort price"
      >
        <SortIcon className={styles.sortIcon} />
        По&nbsp;цене
      </button>
    </div>
  );
};
