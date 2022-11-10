import styles from './Loading.module.css';
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingIcon from './loading.svg';

export const Loading: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      router.events?.on('routeChangeStart', (): void => setLoading(true));
      router.events?.on('routeChangeComplete', (): void => setLoading(false));
    }
  }, []);

  return (
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
  );
};
