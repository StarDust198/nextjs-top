import { SearchPageComponentProps } from './SearchPageComponent.props';
import styles from './SearchPageComponent.module.css';
import cn from 'classnames';
import React, { FC, Fragment, useEffect, useReducer } from 'react';
import { Advantage, HhData, Htag, Product, Sort, Tag } from '../../components';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { SortEnum } from '../../components/Sort/Sort.props';
import { sortReducer } from '../../helpers/sort.reducer';
import { useReducedMotion } from 'framer-motion';

export const SearchPageComponent: FC<SearchPageComponentProps> = ({
  firstCategory,
  products,
}) => {
  const [{ products: sortedProducts, sort, direction }, dispatch] = useReducer(
    sortReducer,
    { products, sort: SortEnum.rating, direction: 'up' }
  );
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    dispatch({ type: 'updateProducts', payload: products });
  }, [products]);

  const onSort = (sort: SortEnum): void => {
    dispatch({ type: 'sort', payload: sort });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <div>
          <Htag className={styles.titleText} tag="h1">
            Результаты поиска
          </Htag>
          &nbsp;&nbsp;
          {products && (
            <Tag
              className={styles.titleTag}
              color="gray"
              size="m"
              aria-label={products.length + ' элементов'}
            >
              {products.length}
            </Tag>
          )}
        </div>
        <Sort
          sort={sort}
          setSort={onSort}
          changeDirection={(): void => dispatch({ type: 'changeDirection' })}
          direction={direction}
        />
      </div>
      <div role="list">
        {sortedProducts && sortedProducts.length > 0 ? (
          sortedProducts.map((p) => (
            <Product
              layout
              transition={{ duration: shouldReduceMotion ? 0 : 1 }}
              role="listitem"
              key={p._id}
              product={p}
            />
          ))
        ) : (
          <Htag tag={'h2'}>Подходящих курсов не найдено</Htag>
        )}
      </div>
    </div>
  );
};
