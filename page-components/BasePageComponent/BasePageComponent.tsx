import { BasePageComponentProps } from './BasePageComponent.props';
import styles from './BasePageComponent.module.css';
import React, { FC, useEffect } from 'react';
import { Card, Htag, P } from '../../components';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const BasePageComponent: FC<BasePageComponentProps> = ({
  firstCategory,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && firstCategory === 0) {
      router.push({ pathname: '/' });
    }
  }, [firstCategory, router]);

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
