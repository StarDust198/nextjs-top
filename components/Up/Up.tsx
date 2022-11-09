import styles from './Up.module.css';
import { FC, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useScrollY } from '../../hooks/useScrollY';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';

export const Up: FC = () => {
  const controls = useAnimation();
  const y = useScrollY();

  useEffect(() => {
    controls.start({
      opacity: y > 500 ? 1 - (1 - y / document.body.scrollHeight) / 2 : 0,
    });
  }, [y, controls]);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.div
      className={styles.up}
      animate={controls}
      initial={{ opacity: 0 }}
    >
      <ButtonIcon
        appearance="primary"
        icon="up"
        onClick={scrollToTop}
        aria-label="Наверх"
      />
    </motion.div>
  );
};
