import { HomeCardProps } from './HomeCard.props';
import styles from './HomeCard.module.css';
import cn from 'classnames';
import { FC, Fragment, useState } from 'react';
import { Card } from '../Card/Card';
import { Htag } from '../Htag/Htag';
import { Divider } from '../Divider/Divider';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

export const HomeCard: FC<HomeCardProps> = ({
  cardInfo,
  className,
  ...props
}) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    visible: {
      height: 'auto',
      opacity: 1,
      marginTop: 10,
    },
    hidden: { height: 0, opacity: 0, marginTop: 0 },
  };

  return (
    <Card className={cn(className, styles.card)}>
      <Htag className={styles.title} tag="h3">
        {cardInfo._id.secondCategory}
      </Htag>
      {cardInfo.pages?.map((item, i) => (
        <Fragment key={item._id}>
          <Link href={`/courses/${item.alias}`}>
            <motion.a
              initial="hidden"
              animate={showAll || i < 3 ? 'visible' : 'hidden'}
              variants={variants}
              transition={{ duration: !shouldReduceMotion ? 0.01 : 1 }}
              className={styles.link}
            >
              {item.category}
            </motion.a>
          </Link>
        </Fragment>
      ))}
      <Divider />
      {cardInfo.pages.length > 3 && (
        <button
          className={styles.button}
          aria-expanded={showAll}
          aria-label="Показать все"
          onClick={(): void => setShowAll((show: boolean) => !show)}
        >
          {showAll ? 'Скрыть курсы' : 'Смотреть все курсы'}
        </button>
      )}
    </Card>
  );
};
