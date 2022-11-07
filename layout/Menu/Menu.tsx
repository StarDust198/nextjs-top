import styles from './Menu.module.css';
import cn from 'classnames';
import { FC, useContext, KeyboardEvent, useState } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';
import { motion, useReducedMotion } from 'framer-motion';

export const Menu: FC = () => {
  const { menu, firstCategory, setMenu } = useContext(AppContext);
  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: shouldReduceMotion
        ? {}
        : {
            when: 'beforeChildren',
            staggerChildren: 0.1,
          },
    },
    hidden: {
      marginBottom: 0,
    },
  };

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 'auto',
      marginBottom: 10,
    },
    hidden: {
      marginBottom: 0,
      opacity: shouldReduceMotion ? 0 : 1,
      height: 0,
    },
  };

  const openSecondLevel = (secondCategory: string): void => {
    setMenu &&
      setMenu(
        menu.map((m) => {
          if (m._id.secondCategory === secondCategory) {
            setAnnounce(m.isOpen ? 'closed' : 'opened');
            m.isOpen = !m.isOpen;
          }
          return m;
        })
      );
  };

  const openSecondLevelKey = (
    e: KeyboardEvent,
    secondCategory: string
  ): void => {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      openSecondLevel(secondCategory);
    }
  };

  const buildFirstLevel = (): JSX.Element => {
    return (
      <ul>
        {firstLevelMenu.map((m) => (
          <li key={m.route} aria-expanded={m.id === firstCategory}>
            <Link href={`/${m.route}`}>
              <a>
                <div
                  className={cn(styles.firstLevel, {
                    [styles.firstLevelActive]: m.id === firstCategory,
                  })}
                >
                  {m.icon}
                  <span>{m.name}</span>
                </div>
              </a>
            </Link>
            {m.id === firstCategory && buildSecondLevel(m)}
          </li>
        ))}
      </ul>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem): JSX.Element => {
    return (
      <ul className={styles.secondBlock}>
        {menu.map((m) => {
          if (
            m.pages.map((p) => p.alias).includes(router.asPath.split('/')[2])
          ) {
            m.isOpen = true;
          }

          return (
            <li key={m._id.secondCategory}>
              <button
                className={styles.secondLevel}
                onClick={(): void => openSecondLevel(m._id.secondCategory)}
                onKeyDown={(e: KeyboardEvent): void =>
                  openSecondLevelKey(e, m._id.secondCategory)
                }
                aria-expanded={m.isOpen}
              >
                {m._id.secondCategory}
              </button>
              <motion.ul
                layout
                variants={variants}
                className={styles.secondLevelBlock}
                initial={m.isOpen ? 'visible' : 'hidden'}
                animate={m.isOpen ? 'visible' : 'hidden'}
              >
                {buildThirdLevel(m.pages, menuItem.route, m.isOpen ?? false)}
              </motion.ul>
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (
    pages: PageItem[],
    route: string,
    isOpen: boolean
  ): JSX.Element[] => {
    return pages.map((p) => (
      <motion.li key={p._id} variants={variantsChildren}>
        <Link href={`/${route}/${p.alias}`}>
          <a
            tabIndex={isOpen ? 0 : -1}
            className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]:
                `/${route}/${p.alias}` === router.asPath,
            })}
            aria-current={
              `/${route}/${p.alias}` === router.asPath ? 'page' : false
            }
          >
            {p.category}
          </a>
        </Link>
      </motion.li>
    ));
  };

  return (
    <nav role="navigation">
      {announce && (
        <span className="vHidden" role="log">
          {announce === 'opened' ? 'развернуто' : 'свернуто'}
        </span>
      )}
      {buildFirstLevel()}
    </nav>
  );
};
