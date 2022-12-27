import {
  GetServerSideProps,
  GetStaticProps,
  GetServerSidePropsContext,
} from 'next';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../helpers/helpers';
import { ParsedUrlQuery } from 'querystring';
import { TopPageModel } from '../interfaces/page.interface';
import { ProductModel } from '../interfaces/product.interface';
import Head from 'next/head';
import { SearchPageComponent } from '../page-components';

function Search({ menu, products, firstCategory }: SearchProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Поиск лучших курсов онлайн | Обучение с нуля (2022)</title>
        <meta
          name="description"
          content="Поиск и сравнение лучших курсов по любым направлениям онлайн в 2022 г"
        />
        <meta
          property="og:title"
          content="Поиск лучших курсов онлайн | Обучение с нуля (2022)"
        />
        <meta
          property="og:description"
          content="Поиск и сравнение лучших курсов по любым направлениям онлайн в 2022 г"
        />
        <meta property="og:type" content="article" />
      </Head>
      <SearchPageComponent firstCategory={firstCategory} products={products} />
    </>
  );
}

export default withLayout(Search);

export const getServerSideProps: GetServerSideProps<SearchProps> = async (
  context: GetServerSidePropsContext<ParsedUrlQuery>
) => {
  const firstCategory = 0;
  const term =
    typeof context.query.q === 'string' ? context.query.q.toLowerCase() : '';
  if (!term) return { notFound: true };

  let categories: string[] = [];
  const matchingProducts: ProductModel[] = [];
  const matchingProductIds: string[] = [];

  try {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory,
    });
    categories = menu.flatMap((menuItem) =>
      menuItem.pages.map((page) => page.category)
    );

    const coursePromises = categories.map((category) => {
      return new Promise<void>((resolve) => {
        axios
          .post<ProductModel[]>(API.product.find, {
            category,
            limit: 10,
          })
          .then((res) => {
            matchingProducts.push(
              ...res.data.filter((item) => {
                if (
                  item.title.toLowerCase().includes(term) &&
                  !matchingProductIds.includes(item._id)
                ) {
                  matchingProductIds.push(item._id);
                  return true;
                }
                return false;
              })
            );
            resolve();
          });
      });
    });

    await Promise.all(coursePromises);

    return {
      props: {
        menu,
        firstCategory,
        products: matchingProducts,
      },
    };
  } catch {
    return { notFound: true };
  }
};

interface SearchProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
  products: ProductModel[];
}
