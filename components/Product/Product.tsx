import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import styles from './Product.module.css';
import { ProductModel } from '../../interfaces/product.interface';
import { Card } from '../Card/Card';
import { declOfNum, priceRu } from '../../helpers';
import { Tag } from '../Tag/Tag';
import { Rating } from '../Rating/Rating';
import Image from 'next/image';
import { Divider } from '../Divider/Divider';
import { Button } from '../Button/Button';
import cn from 'classnames';

interface IProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: ProductModel;
}

export const Product: FC<IProductProps> = ({ product, className, ...props }) => {
  const {
    image,
    title,
    price,
    oldPrice,
    credit,
    categories,
    reviewAvg,
    initialRating,
    reviewCount,
    description,
    characteristics,
    advantages,
    disadvantages,
  } = product;

  return (
    <div className={className} {...props}>
      <Card className={styles.product}>
        <div className={styles.logo}>
          <Image src={image} alt={title} width={70} height={70} />
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.price}>
          <span>
            <span className="visualyHidden">цена</span>
            {priceRu(price)}
          </span>
          {product.oldPrice && (
            <Tag className={styles.oldPrice} color="green">
              <span className="visualyHidden">скидка</span>
              {priceRu(price - oldPrice)}
            </Tag>
          )}
        </div>
        <div className={styles.credit}>
          <span className="visualyHidden">кредит</span>
          {priceRu(credit)}/<span className={styles.month}>мес</span>
        </div>
        <div className={styles.rating}>
          <span className="visualyHidden">{'рейтинг' + (reviewAvg ?? initialRating)}</span>
          <Rating rating={reviewAvg ?? initialRating} />
        </div>
        <div className={styles.tags}>
          {categories.map((c) => (
            <Tag key={c} className={styles.category} color="ghost">
              {c}
            </Tag>
          ))}
        </div>
        <div className={styles.priceTitle} aria-hidden={true}>
          цена
        </div>
        <div className={styles.creditTitle} aria-hidden={true}>
          кредит
        </div>
        <div className={styles.rateTitle}>
          <a href="#ref">
            {reviewCount} {declOfNum(reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
          </a>
        </div>
        <Divider className={styles.hr} />
        <div className={styles.description}>{description}</div>
        <div className={styles.feature}>
          {characteristics.map((c) => (
            <div className={styles.characteristics} key={c.name}>
              <span className={styles.characteristicsName}>{c.name}</span>
              <span className={styles.characteristicsDots}></span>
              <span className={styles.characteristicsValue}>{c.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.advBlock}>
          {advantages && (
            <div className={styles.advantages}>
              <div className={styles.advTitle}>Преимущества</div>
              <div>{product.advantages}</div>
            </div>
          )}
          {disadvantages && (
            <div className={styles.disadvantages}>
              <div className={styles.advTitle}>Недостатки</div>
              <div>{product.disadvantages}</div>
            </div>
          )}
        </div>
        <Divider className={cn(styles.hr, styles.hr2)} />
        <div className={styles.actions}>
          <Button appearance="primary">Узнать подробнее</Button>
          <Button appearance="ghost" className={styles.reviewButton}>
            Читать отзывы
          </Button>
        </div>
      </Card>
    </div>
  );
};
