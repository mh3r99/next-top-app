import React, { DetailedHTMLProps, FC, HTMLAttributes, useState, KeyboardEvent, FormEvent } from 'react';
import cn from 'classnames';
import styles from './Search.module.css';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import GlassIcon from './glass.svg';
import { useRouter } from 'next/router';

interface ISearchProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {}

export const Search: FC<ISearchProps> = ({ className, ...props }) => {
  const [search, setSearch] = useState('');

  const router = useRouter();

  const goToSearch = () => {
    router.push({
      pathname: '/search',
      query: {
        q: search,
      },
    });
  };

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault()
    goToSearch();
  };

  return (
    <form onSubmit={handleSubmit} className={cn(className, styles.search)} {...props} role="search">
      <Input
        className={styles.input}
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        type="submit"
        appearance="primary"
        className={styles.button}
        onClick={goToSearch}
        aria-label="Искать по сайту">
        <GlassIcon />
      </Button>
    </form>
  );
};
