import styles from './Footer.module.css';
import cn from 'classnames';
import { FC, useContext } from 'react';
import { format } from 'date-fns';
import { AppContext } from '../../context/app.context';

export const Menu: FC = () => {
  const { menu, firstCategory, setMenu } = useContext(AppContext);

  return (
    <ul>
      {menu.map((m) => (
        <li key={m._id.secondCategory}>{m._id.secondCategory}</li>
      ))}
    </ul>
  );
};
