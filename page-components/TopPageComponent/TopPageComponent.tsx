import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import cn from 'classnames';
import { FC, useEffect, useReducer } from 'react';
import { Advantage, HhData, Htag, Product, Sort, Tag } from '../../components';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { SortEnum } from '../../components/Sort/Sort.props';
import { sortReducer } from './sort.reducer';

export const TopPageComponent: FC<TopPageComponentProps> = ({
  page,
  firstCategory,
  products,
}) => {
  const [{ products: sortedProducts, sort }, dispatch] = useReducer(
    sortReducer,
    { products, sort: SortEnum.rating }
  );

  useEffect(() => {
    dispatch({ type: 'updateProducts', payload: products });
  }, [products]);

  const onSort = (sort: SortEnum): void => {
    dispatch({ type: 'sort', payload: sort });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag="h1">{page.title}</Htag>
        {products && (
          <Tag color="gray" size="m">
            {products.length}
          </Tag>
        )}
        <Sort sort={sort} setSort={onSort} />
      </div>
      <div>
        {sortedProducts &&
          sortedProducts.map((p) => <Product layout key={p._id} product={p} />)}
      </div>
      <div className={cn(styles.title, styles.hhTitle)}>
        <Htag tag="h2">Вакансии - {page.category}</Htag>
        <Tag color="red" size="m">
          hh.ru
        </Tag>
      </div>

      {firstCategory === TopLevelCategory.Courses && page.hh && (
        <HhData {...page.hh} />
      )}

      {page.advantages && page.advantages.length > 0 && (
        <div className={styles.advantages}>
          <Htag tag="h2">Преимущества</Htag>
          {page.advantages.map((adv) => (
            <Advantage key={adv._id} {...adv} />
          ))}
        </div>
      )}

      {page.seoText && (
        <div
          className={styles.seo}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}

      <Htag tag="h2">Получаемые навыки</Htag>
      <div className={styles.tags}>
        {page.tags.map((tag) => (
          <Tag color="primary" key={tag}>
            {tag}
          </Tag>
        ))}
      </div>
    </div>
  );
};
