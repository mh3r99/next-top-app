import React, { DetailedHTMLProps, FC, HtmlHTMLAttributes } from 'react';
import cn from "classnames"
import SortIcon from './sort.svg';
import styles from './Sort.module.css';

export enum SortEnum {
  Rating,
  Price,
}

interface ISortProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  sort: SortEnum;
  setSort: (sort: SortEnum) => void;
}

export const Sort: FC<ISortProps> = ({sort, setSort, className, ...props}) => {
  return <div className={cn(styles.sort, className)} {...props}>
  <div className={styles.sortName} id="sort">Сортировка</div>
  <button
    id="rating"
    onClick={() => setSort(SortEnum.Rating)}
    className={cn({
      [styles.active]: sort == SortEnum.Rating
    })}
    aria-pressed={sort == SortEnum.Rating}
    aria-labelledby="sort rating"
  >
    <SortIcon className={styles.sortIcon} />По рейтингу
  </button>
  <button
    id="price"
    onClick={() => setSort(SortEnum.Price)}
    className={cn({
      [styles.active]: sort == SortEnum.Price
    })}
    aria-pressed={sort == SortEnum.Price}
    aria-labelledby="sort price"
  >
    <SortIcon className={styles.sortIcon} />По цене
  </button>
</div>
};

