import { AppProps } from 'next/dist/shared/lib/router/router';
import Head from 'next/head';
import Router from 'next/router';
import ym, { YMInitializer } from 'react-yandex-metrika';
import '../styles/globals.css';
import { Loading } from '../components';

Router.events?.on('routeChangeComplete', (url: string) => {
  if (typeof window !== 'undefined') {
    ym('hit', url);
  }
});

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>NextJS Top - the best top</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}
        />
        <meta property="og:locale" content="ru_RU" />
      </Head>
      <YMInitializer
        accounts={[]}
        options={{ webvisor: true, defer: true }}
        version="2"
      />
      <Component {...pageProps} />
      <Loading />
    </>
  );
}

export default MyApp;
