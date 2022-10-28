import { FirstLevelMenuItem } from '../interfaces/menu.interface';
import { TopLevelCategory } from '../interfaces/page.interface';
import BooksIcon from './icons/books.svg';
import CoursesIcon from './icons/courses.svg';
import ProductsIcon from './icons/products.svg';
import ServicesIcon from './icons/services.svg';

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
