import { GetStaticProps } from 'next';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';
import { HomePageComponent } from '../page-components';
import Head from 'next/head';

function Home({ menu }: HomeProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Агрегатор курсов Best Courses</title>
        <meta
          name="description"
          content={`Поиск и сравнение лучших курсов по любым направлениям онлайн в ${new Date().getFullYear()}г`}
        />
        <meta property="og:title" content="Агрегатор курсов Best Courses" />
        <meta
          property="og:description"
          content={`Поиск и сравнение лучших курсов по любым направлениям онлайн в ${new Date().getFullYear()}г`}
        />
        <meta property="og:type" content="article" />
      </Head>
      <HomePageComponent menu={menu} />
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  });
  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
