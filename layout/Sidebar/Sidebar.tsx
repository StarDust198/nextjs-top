import { SidebarProps } from './Sidebar.props';
import styles from './Sidebar.module.css';
import cn from 'classnames';
import { FC } from 'react';
import { Menu } from '../Menu/Menu';
import Logo from '../logo.svg';

export const Sidebar: FC<SidebarProps> = ({ className, ...props }) => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Logo className={styles.logo} />
      <div className={cn(styles.search)}>Search</div>
      <Menu />
    </div>
  );
};
