import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import Logo from '../logo.svg';
import { ButtonIcon } from '../../components';
import { motion } from 'framer-motion';
import { Sidebar } from '../Sidebar/Sidebar';
import { useRouter } from 'next/router';

export const Header: FC<HeaderProps> = ({ className, ...props }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setMenuOpen(false);
  }, [router]);

  const variants = {
    visible: {
      x: 0,
    },
    hidden: {
      x: '100%',
    },
  };

  return (
    <header className={cn(styles.header, className)} {...props}>
      <Logo />
      <ButtonIcon
        appearance="white"
        icon="menu"
        onClick={(): void => setMenuOpen(true)}
      />
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
    </header>
  );
};
