import React from "react";
import {
  TopLevelCategory,
  TopPageModel,
} from "../../interfaces/page.interface";
import { ProductModel } from "../../interfaces/product.interface";
import styles from "./TopPageComponents.module.css";
import { Htag, Tag, HhData, Paragraph } from "../../components";
import { Advantages } from "../../components/Advantages/Advantages";

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
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag="h1">{page.title}</Htag>
        {products && (
          <Tag color="grey" size="m">
            {products.length}
          </Tag>
        )}
        <span>Сортировка</span>
      </div>
      <div>
        {products && products.map((p) => <div key={p._id}>{p.title}</div>)}
      </div>
      <div className={styles.hhTitle}>
        <Htag tag="h2">Вакансии - {page.category}</Htag>
        <Tag color="red" size="m">
          hh.ru
        </Tag>
      </div>
      {firstCategory == TopLevelCategory.Courses && page.hh && (
        <HhData {...page.hh} />
      )}
      {page.advantages && page.advantages.length > 0 && (
        <>
          <Htag tag="h2">Преимущества</Htag>
          <Advantages advantages={page.advantages} />
        </>
      )}
      {page.seoText && <Paragraph>{page.seoText}</Paragraph> }
      <Htag tag="h2">Получаемые навыки</Htag>
      {page.tags.map(tag=> <Tag key={tag} color="primary">{tag}</Tag> )}
      
    </div>
  );
};

export default TopPageComponents;
