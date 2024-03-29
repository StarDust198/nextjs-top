import { HomeCardProps } from './HomeCard.props';
import styles from './HomeCard.module.css';
import cn from 'classnames';
import { FC, useState } from 'react';
import { Card } from '../Card/Card';
import { Htag } from '../Htag/Htag';
import { Divider } from '../Divider/Divider';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

export const HomeCard: FC<HomeCardProps> = ({ cardInfo, className }) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    visible: {
      transition: shouldReduceMotion
        ? {}
        : {
            when: 'beforeChildren',
            staggerChildren: 0.1,
          },
    },
    hidden: {},
  };

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 'auto',
      marginTop: 10,
    },
    hidden: {
      marginTop: 0,
      opacity: shouldReduceMotion ? 1 : 0,
      height: 0,
    },
  };

  return (
    <Card className={cn(className, styles.card)}>
      <Htag className={styles.title} tag="h3">
        {cardInfo._id.secondCategory}
      </Htag>
      <motion.ul
        variants={variants}
        layout
        initial={showAll ? 'visible' : 'hidden'}
        animate={showAll ? 'visible' : 'hidden'}
      >
        {cardInfo.pages?.map((item, i) => (
          <motion.li
            key={item._id}
            variants={variantsChildren}
            initial={i < 3 ? 'visible' : false}
            animate={i < 3 ? 'visible' : false}
            className={cn(styles.linkListItem, {
              [styles.noHeight]: i > 2 || !showAll,
            })}
          >
            <Link href={`/courses/${item.alias}`}>
              <a className={styles.link} tabIndex={i < 3 || showAll ? 0 : -1}>
                {item.category}
              </a>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
      <Divider />
      {cardInfo.pages.length > 3 && (
        <button
          className={styles.button}
          aria-expanded={showAll}
          aria-label={
            showAll ? 'Скрыть направления' : 'Показать все направления'
          }
          onClick={(): void => setShowAll((show: boolean) => !show)}
        >
          {showAll ? 'Скрыть' : 'Показать все'}
        </button>
      )}
    </Card>
  );
};
