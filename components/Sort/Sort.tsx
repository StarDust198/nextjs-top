import { SortEnum, SortProps } from './Sort.props';
import styles from './Sort.module.css';
import cn from 'classnames';
import { FC } from 'react';
import SortIcon from './sort.svg';

export const Sort: FC<SortProps> = ({ sort, setSort, className, ...props }) => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <span
        onClick={(): void => setSort(SortEnum.rating)}
        className={cn({
          [styles.active]: sort === SortEnum.rating,
        })}
      >
        <SortIcon className={styles.sortIcon} />
        По рейтингу
      </span>
      <span
        onClick={(): void => setSort(SortEnum.price)}
        className={cn({
          [styles.active]: sort === SortEnum.price,
        })}
      >
        <SortIcon className={styles.sortIcon} />
        По цене
      </span>
    </div>
  );
};
