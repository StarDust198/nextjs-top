import { ErrorPageComponentProps } from './ErrorPageComponent.props';
import styles from './ErrorPageComponent.module.css';
import React, { FC } from 'react';
import { Htag } from '../../components';
import Link from 'next/link';

export const ErrorPageComponent: FC<ErrorPageComponentProps> = ({
  message,
}) => {
  return (
    <>
      <Htag tag="h1">{message}</Htag>
      <br />
      <Link href="/">
        <a className={styles.homeLink}>Вернуться на домашнюю страницу</a>
      </Link>
    </>
  );
};
