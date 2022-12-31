import Head from 'next/head';
import { withLayout } from '../layout/Layout';
import { ErrorPageComponent } from '../page-components';

export function Error404(): JSX.Element {
  return (
    <>
      <Head>
        <title>{`Страница не найдена`}</title>
        <meta
          name="description"
          content={`Такой страницы пока не существует`}
        />
        <meta property="og:title" content={`Страница не найдена`} />
        <meta
          property="og:description"
          content={`Такой страницы пока не существует`}
        />
        <meta property="og:type" content="article" />
      </Head>
      <ErrorPageComponent message="Страница не найдена" />
    </>
  );
}

export default withLayout(Error404);
