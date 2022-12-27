import { FirstLevelMenuItem } from '../interfaces/menu.interface';
import { TopLevelCategory } from '../interfaces/page.interface';
import { School } from '../interfaces/school.interface';
import BooksIcon from './icons/books.svg';
import CoursesIcon from './icons/courses.svg';
import ProductsIcon from './icons/products.svg';
import ServicesIcon from './icons/services.svg';

// Данные по страницам для меню
export const firstLevelMenu: FirstLevelMenuItem[] = [
  {
    route: 'courses',
    name: 'Курсы',
    icon: <CoursesIcon />,
    id: TopLevelCategory.Courses,
  },
  {
    route: 'services',
    name: 'Сервисы',
    icon: <ServicesIcon />,
    id: TopLevelCategory.Services,
  },
  {
    route: 'books',
    name: 'Книги',
    icon: <BooksIcon />,
    id: TopLevelCategory.Books,
  },
  {
    route: 'products',
    name: 'Продукты',
    icon: <ProductsIcon />,
    id: TopLevelCategory.Products,
  },
];

// Данные по школам для главной страницы
export const schools: School[] = [
  {
    name: 'Skillbox',
    img: '/uploads/2021-04-03/skillbox.png',
    link: 'https://skillbox.ru/',
  },
  {
    name: 'GeekBrains',
    img: '/uploads/2021-04-03/gb.png',
    link: 'https://gb.ru/',
  },
  {
    name: 'Нетология',
    img: '/uploads/2021-04-04/netology_white.png',
    link: 'https://netology.ru',
  },
  {
    name: 'Contented',
    img: '/uploads/2021-04-04/cd.png',
    link: 'https://contented.ru',
  },
  {
    name: 'SkillFactory',
    img: '/uploads/2021-04-08/sf.png',
    link: 'https://skillfactory.ru',
  },
  {
    name: 'PurpleSchool',
    img: 'https://cdn-bucket.hb.bizmrg.com/courses-top-images/2022-05-11/logo.png',
    link: 'https://purpleschool.ru/',
  },
];

// Форматирование цены
export const priceRu = (price: number): string =>
  price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    .concat(' ₽');

// Склонение множественных чисел
export const declOfNum = (
  num: number,
  titles: [string, string, string]
): string => {
  const div100 = num % 100;
  const div10 = num % 10;
  return `${num} ${
    titles[
      div10 === 0 || div10 > 4 || (div100 > 10 && div100 < 20)
        ? 2
        : div10 > 1
        ? 1
        : 0
    ]
  }`;
};
