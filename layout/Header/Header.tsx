import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import cn from 'classnames';
import { FC } from 'react';

export const Header: FC<HeaderProps> = ({ ...props }) => {
  return <div {...props}>Header</div>;
};
