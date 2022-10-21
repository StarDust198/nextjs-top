import { SidebarProps } from './Sidebar.props';
import styles from './Sidebar.module.css';
import cn from 'classnames';
import { FC } from 'react';

export const Sidebar: FC<SidebarProps> = ({ ...props }) => {
  return <div {...props}>Sidebar</div>;
};
