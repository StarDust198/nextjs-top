import { FooterProps } from './Footer.props';
import styles from './Footer.module.css';
import cn from 'classnames';
import { FC } from 'react';
import { format } from 'date-fns';

export const Footer: FC<FooterProps> = ({ className, ...props }) => {
  return (
    <footer className={cn(className, styles.footer)} {...props}>
      <div className={styles.copyright}>
        OwlTop © 2020 - {format(new Date(), 'yyyy')} Все права защищены
      </div>
      <a href="#" target="_blank">
        Пользовательское соглашение
      </a>
      <a href="#" target="_blank">
        Политика конфиденциальности
      </a>
    </footer>
  );
};
