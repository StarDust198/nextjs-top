import { BasePageComponentProps } from './BasePageComponent.props';
import styles from './BasePageComponent.module.css';
import cn from 'classnames';
import Image from 'next/image';
import React, { FC, Fragment, useEffect, useReducer } from 'react';
import {
  Advantage,
  Card,
  HhData,
  HomeCard,
  Htag,
  P,
  Product,
  Sort,
  Tag,
} from '../../components';
import { TopLevelCategory } from '../../interfaces/page.interface';
import StarIcon from './star.svg';
import { schools } from '../../helpers/helpers';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const BasePageComponent: FC<BasePageComponentProps> = ({
  // page,
  // products,
  firstCategory,
  menu,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && firstCategory === 0) {
      router.push({ pathname: '/' });
    }
  }, [firstCategory]);

  return (
    <Card className={styles.wrapper}>
      <Htag tag="h1">Страница в разработке...</Htag>
      <P className={styles.description} size="s">
        Сайт создан в образовательных целях и базируется на неполной версии API.
      </P>
      <Link href="/">
        <a className={styles.homeLink}>Вернуться на домашнюю страницу</a>
      </Link>
    </Card>
  );
};
