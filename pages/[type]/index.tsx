import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { withLayout } from '../../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../../interfaces/menu.interface';
import { firstLevelMenu } from '../../helpers/helpers';
import { ParsedUrlQuery } from 'querystring';
import { API } from '../../helpers/api';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/app.context';
import { BasePageComponent } from '../../page-components';
import Head from 'next/head';

function Type({ firstCategory, menu }: TypeProps): JSX.Element {
  const { setMenu } = useContext(AppContext);

  useEffect(() => {
    setMenu && setMenu(menu);
  }, [setMenu, menu]);

  return (
    <>
      <Head>
        <title>{`${firstLevelMenu[firstCategory]?.name} - страница в разработке`}</title>
        <meta
          name="description"
          content={`${firstLevelMenu[firstCategory]?.name} - в будущем здесь появится страница с описанием`}
        />
        <meta
          property="og:title"
          content={`${firstLevelMenu[firstCategory]?.name} - страница в разработке`}
        />
        <meta
          property="og:description"
          content={`${firstLevelMenu[firstCategory]?.name} - в будущем здесь появится страница с описанием`}
        />
        <meta property="og:type" content="article" />
      </Head>
      <BasePageComponent firstCategory={firstCategory} menu={menu} />
    </>
  );
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map((m) => '/' + m.route),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) return { notFound: true };
  const firstCategoryItem = firstLevelMenu.find((m) => m.route === params.type);
  if (!firstCategoryItem) return { notFound: true };

  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory: firstCategoryItem.id,
  });
  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id,
    },
  };
};

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
}
