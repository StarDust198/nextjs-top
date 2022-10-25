import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import cn from 'classnames';
import { FC } from 'react';
import { Advantage, HhData, Htag, P, Tag } from '../../components';
import { TopLevelCategory } from '../../interfaces/page.interface';

export const TopPageComponent: FC<TopPageComponentProps> = ({
  page,
  firstCategory,
  products,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag="h1">{page.title}</Htag>
        {products && (
          <Tag color="gray" size="m">
            {products.length}
          </Tag>
        )}
        <span>Sorting</span>
      </div>
      <div>
        {products && products.map((p) => <div key={p._id}>{p.title}</div>)}
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
