import { HomePageComponentProps } from './HomePageComponent.props';
import styles from './HomePageComponent.module.css';
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

export const HomePageComponent: FC<HomePageComponentProps> = ({
  // page,
  // products,
  menu,
}) => {
  return (
    <div className={styles.wrapper}>
      <Htag className={styles.title} tag="h1">
        Best Courses&nbsp;
        <StarIcon /> - агрегатор лучших онлайн курсов
      </Htag>
      <Card className={styles.homeBlock}>
        <Htag className={styles.subtitle} tag="h3">
          Приветствуем Вас на нашем сайте, посвященном выбору и сравнению
          курсов!
        </Htag>
        <P className={styles.description} size="m">
          Здесь Вы можете найти и сравнить курсы по различным темам и
          направлениям, предлагаемые компаниями и учебными центрами. Мы отобрали
          для Вас информацию о лучших курсах, так что Вы сможете подобрать
          нужный именно Вам курс, а также ознакомиться с отзывами или написать
          свой отзыв. Тут легко сравнить цены, программы и репутацию различных
          курсов, чтобы найти тот, который наиболее соответствует Вашим
          требованиям. Подберите идеальный курс с Best Courses!
        </P>
      </Card>
      {menu &&
        menu.map((card) => (
          <HomeCard key={card._id.secondCategory} cardInfo={card} />
        ))}
      <Card className={styles.homeBlock}>
        <Htag className={styles.schoolsTitle} tag="h3">
          Компании, выпускающие курсы на нашем сайте:
        </Htag>
        <div className={styles.schoolContainer}>
          {schools.map((school) => (
            <a href={school.link} className={cn(styles.schoolLink)}>
              <Image
                src={
                  school.img.startsWith('http')
                    ? school.img
                    : process.env.NEXT_PUBLIC_DOMAIN + school.img
                }
                title={school.name}
                alt={school.name}
                width={70}
                height={70}
              />
            </a>
          ))}
        </div>
        <P size="s">и другие...</P>
      </Card>
    </div>
  );
};
