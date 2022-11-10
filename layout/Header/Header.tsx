import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import Logo from '../logo.svg';
import { ButtonIcon } from '../../components';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Sidebar } from '../Sidebar/Sidebar';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const Header: FC<HeaderProps> = ({ className, ...props }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMenuOpen(false);
  }, [router]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      // document.body.style.paddingRight = '18px';
    } else {
      document.body.style.overflow = 'unset';
      // document.body.style.paddingRight = 'unset';
    }
  }, [menuOpen]);

  const variants = {
    visible: {
      opacity: 1,
      x: 0,
    },
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: '-100%',
    },
  };

  return (
    <header className={cn(styles.header, className)} {...props}>
      <ButtonIcon
        appearance="white"
        icon="menu"
        onClick={(): void => setMenuOpen(true)}
      />

      <Link href={`/`}>
        <a className={styles.logoLink}>
          <Logo />
        </a>
      </Link>

      <motion.div
        className={styles.mobileMenu}
        variants={variants}
        initial="hidden"
        animate={menuOpen ? 'visible' : 'hidden'}
        transition={{ duration: 0.5 }}
      >
        <Sidebar />
        <ButtonIcon
          className={styles.menuClose}
          appearance="white"
          icon="close"
          onClick={(): void => setMenuOpen(false)}
        />
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            onClick={(): void => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
};
