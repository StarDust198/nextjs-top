import { LayoutProps } from './Layout.props';
import styles from './Layout.module.css';
import cn from 'classnames';
import { FC, KeyboardEvent, useState, useRef, useEffect } from 'react';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { Footer } from './Footer/Footer';
import { AppContextProvider, IAppContext } from '../context/app.context';
import { Up } from '../components';
// import { Loading } from './Loading/Loading';
import Router from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingIcon from './loading.svg';

const Layout: FC<LayoutProps> = ({ children }) => {
  const [showSkip, setShowSkip] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setFalse = (): void => setLoading(false);
    const setTrue = (): void => setLoading(true);

    if (typeof window !== 'undefined') {
      Router.events?.on('routeChangeStart', setTrue);
      Router.events?.on('routeChangeComplete', setFalse);
    }

    return () => {
      if (typeof window !== 'undefined') {
        Router.events?.off('routeChangeStart', setTrue);
        Router.events?.off('routeChangeComplete', setFalse);
      }
    };
  }, []);

  const onSkip = (e: KeyboardEvent): void => {
    if (e.code == 'Space' || e.code === 'Enter') {
      e.preventDefault();
      bodyRef.current?.focus();
    }
    setShowSkip(false);
  };

  return (
    <div className={styles.wrapper}>
      <a
        tabIndex={0}
        className={cn(styles.skipLink, {
          [styles.showSkipLink]: showSkip,
        })}
        onFocus={(): void => setShowSkip(true)}
        onKeyDown={(e: KeyboardEvent): void => onSkip(e)}
      >
        Перейти к содержанию
      </a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <main className={styles.body} tabIndex={0} ref={bodyRef} role="main">
        {children}
      </main>
      <Footer className={styles.footer} />
      <Up />

      <AnimatePresence>
        {loading && (
          <motion.div
            className={styles.loading}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <LoadingIcon />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
  Component: FC<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};
