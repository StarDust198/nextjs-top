import Head from 'next/head';
import { withLayout } from '../layout/Layout';
import { ErrorPageComponent } from '../page-components';

export function Error500(): JSX.Element {
  return (
    <>
      <Head>
        <title>{`Что-то пошло не так`}</title>
        <meta name="description" content={`Ошибка на сервере`} />
        <meta property="og:title" content={`Что-то пошло не так`} />
        <meta property="og:description" content={`Ошибка на сервере`} />
        <meta property="og:type" content="article" />
      </Head>
      <ErrorPageComponent message="Ошибка на сервере" />
    </>
  );
}

export default withLayout(Error500);
