import { SearchProps } from './Search.props';
import styles from './Search.module.css';
import cn from 'classnames';
import { FC, KeyboardEvent, useState } from 'react';
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

  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
      goToSearch();
    }
  };

  return (
    <form className={cn(styles.search, className)} {...props} role="search">
      <Input
        className={styles.input}
        value={search}
        onChange={(e): void => setSearch(e.target.value)}
        placeholder="Поиск..."
        onKeyDown={handleKeyDown}
      />
      <Button
        appearance="primary"
        className={styles.button}
        onClick={goToSearch}
        aria-label={'Искать по сайту'}
      >
        <GlassIcon />
      </Button>
    </form>
  );
};
