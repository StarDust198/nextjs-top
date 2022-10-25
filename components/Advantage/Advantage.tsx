import { AdvantageProps } from './Advantage.props';
import styles from './Advantage.module.css';
import { FC } from 'react';
import CheckIcon from './check.svg';
import { Htag } from '../Htag/Htag';
import { P } from '../P/P';

export const Advantage: FC<AdvantageProps> = ({ title, description }) => {
  return (
    <div className={styles.advantage}>
      {/* <div className={styles.left}> */}
      <CheckIcon />

      {/* </div> */}
      {/* <div> */}
      <Htag tag="h3">{title}</Htag>
      <hr className={styles.line} />
      <P>{description}</P>
      {/* </div> */}
    </div>
  );
};
