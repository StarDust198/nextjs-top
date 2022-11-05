import styles from './Menu.module.css';
import cn from 'classnames';
import { FC, useContext, KeyboardEvent } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';
import { motion } from 'framer-motion';

export const Menu: FC = () => {
  const { menu, firstCategory, setMenu } = useContext(AppContext);
  const router = useRouter();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: {
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
      height: 29,
    },
    hidden: {
      opacity: 0,
      height: 0,
    },
  };

  const openSecondLevel = (secondCategory: string): void => {
    setMenu &&
      setMenu(
        menu.map((m) => {
          if (m._id.secondCategory === secondCategory) {
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
      <>
        {firstLevelMenu.map((m) => (
          <div key={m.route}>
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
          </div>
        ))}
      </>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem): JSX.Element => {
    return (
      <div className={styles.secondBlock}>
        {menu.map((m) => {
          if (
            m.pages.map((p) => p.alias).includes(router.asPath.split('/')[2])
          ) {
            m.isOpen = true;
          }

          return (
            <div key={m._id.secondCategory}>
              <div
                className={styles.secondLevel}
                onClick={(): void => openSecondLevel(m._id.secondCategory)}
                onKeyDown={(e: KeyboardEvent): void =>
                  openSecondLevelKey(e, m._id.secondCategory)
                }
                tabIndex={0}
              >
                {m._id.secondCategory}
              </div>
              <motion.div
                layout
                variants={variants}
                className={styles.secondLevelBlock}
                initial={m.isOpen ? 'visible' : 'hidden'}
                animate={m.isOpen ? 'visible' : 'hidden'}
              >
                {buildThirdLevel(m.pages, menuItem.route, m.isOpen ?? false)}
              </motion.div>
            </div>
          );
        })}
      </div>
    );
  };

  const buildThirdLevel = (
    pages: PageItem[],
    route: string,
    isOpen: boolean
  ): JSX.Element[] => {
    return pages.map((p) => (
      <motion.div key={p._id} variants={variantsChildren}>
        <Link href={`/${route}/${p.alias}`}>
          <a
            tabIndex={isOpen ? 0 : -1}
            className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]:
                `/${route}/${p.alias}` === router.asPath,
            })}
          >
            {p.category}
          </a>
        </Link>
      </motion.div>
    ));
  };

  return <div>{buildFirstLevel()}</div>;
};
