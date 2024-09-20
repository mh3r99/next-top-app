import React, { useReducer } from 'react';
import { TopLevelCategory, TopPageModel } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';
import styles from './TopPageComponents.module.css';
import { Htag, Tag, HhData, Advantages } from '../../components';
import  {  Sort, SortEnum } from '../../components/Sort/Sort';
import { sortReducer } from './sort.reducer';

interface ITopPageComponentsProps extends Record<string, unknown> {
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}

const TopPageComponents: React.FC<ITopPageComponentsProps> = ({
  page,
  products,
  firstCategory,
}) => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, {
    products,
    sort: SortEnum.Rating,
  });

  const setSort = (sort: SortEnum) => {
    dispatchSort({
      type: sort,
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag="h1">{page.title}</Htag>
        {products && (
          <Tag color="grey" size="m">
            {products.length}
          </Tag>
        )}
        <Sort sort={sort} setSort={setSort} />
        <span>Сортировка</span>
      </div>
      <div>{sortedProducts && sortedProducts.map((p) => <div key={p._id}>{p.title}</div>)}</div>
      <div className={styles.hhTitle}>
        <Htag tag="h2">Вакансии - {page.category}</Htag>
        <Tag color="red" size="m">
          hh.ru
        </Tag>
      </div>
      {firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
      {page.advantages && page.advantages.length > 0 && (
        <>
          <Htag tag="h2">Преимущества</Htag>
          <Advantages advantages={page.advantages} />
        </>
      )}
      {page.seoText && (
        <div
          className={styles.seo}
          dangerouslySetInnerHTML={{
            __html: page.seoText,
          }}
        />
      )}
      <Htag tag="h2">Получаемые навыки</Htag>
      {page.tags.map((tag) => (
        <Tag key={tag} color="primary">
          {tag}
        </Tag>
      ))}
    </div>
  );
};

export default TopPageComponents;
