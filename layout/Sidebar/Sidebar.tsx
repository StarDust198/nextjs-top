import { SidebarProps } from './Sidebar.props';
import styles from './Sidebar.module.css';
import cn from 'classnames';
import { FC } from 'react';
import { Menu } from '../Menu/Menu';
import Logo from '../logo.svg';
import { Search } from '../../components';
import Link from 'next/link';

export const Sidebar: FC<SidebarProps> = ({ className, ...props }) => {
  return (
    <aside className={cn(className, styles.sidebar)} {...props}>
      <Link href={`/`}>
        <a className={styles.logoLink}>
          <Logo />
        </a>
      </Link>
      <Search />
      <Menu />
    </aside>
  );
};
