import { SearchProps } from './Search.props';
import styles from './Search.module.css';
import cn from 'classnames';
import { FC, FormEvent, useState } from 'react';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import GlassIcon from './glass.svg';
import { useRouter } from 'next/router';

export const Search: FC<SearchProps> = ({ className, ...props }) => {
  const [search, setSearch] = useState<string>('');

  const router = useRouter();

  const goToSearch = (): void => {
    router.push({
      pathname: '/search',
      query: {
        q: search,
      },
    });
  };

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    goToSearch();
  };

  return (
    <form
      className={cn(styles.search, className)}
      {...props}
      role="search"
      onSubmit={(e: FormEvent): void => onSubmit(e)}
    >
      <Input
        className={styles.input}
        value={search}
        onChange={(e): void => setSearch(e.target.value)}
        placeholder="Поиск..."
      />
      <Button
        appearance="primary"
        className={styles.button}
        aria-label={'Искать по сайту'}
      >
        <GlassIcon />
      </Button>
    </form>
  );
};
