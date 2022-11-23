import { HomePageComponentProps } from './HomePageComponent.props';
import styles from './HomePageComponent.module.css';
import cn from 'classnames';
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
import { SortEnum } from '../../components/Sort/Sort.props';
import { useReducedMotion } from 'framer-motion';

export const HomePageComponent: FC<HomePageComponentProps> = ({
  // page,
  // products,
  menu,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag="h1">Best Courses - агрегатор лучших онлайн курсов</Htag>
        <P size="l">
          Добро пожаловать на Best Courses, агрегатор лучших онлайн курсов.
        </P>
        <P size="m">
          Здесь вы найдёте подборки лучших курсов по самым разным направлениям,
          с проверенными отзывами студентов.
        </P>
      </div>
      {menu && menu.map((card) => <HomeCard cardInfo={card} />)}
    </div>
  );
};
