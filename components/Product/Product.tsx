import React, { DetailedHTMLProps, HTMLAttributes, useRef, useState, forwardRef } from 'react';
import styles from './Product.module.css';
import { ProductModel } from '../../interfaces/product.interface';
import { Card } from '../Card/Card';
import { declOfNum, priceRu } from '../../helpers';
import { Tag } from '../Tag/Tag';
import { Rating } from '../Rating/Rating';
import Image from 'next/image';
import { Divider } from '../Divider/Divider';
import { Button } from '../Button/Button';
import { motion } from 'framer-motion';
import cn from 'classnames';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';

interface IProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: ProductModel;
}

 const ProductComponent  = 
  forwardRef<HTMLDivElement, IProductProps>(({ product, className, ...props }, ref) => {
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

    const [isReviewOpened, setIsReviewOpened] = useState(false);
    const reviewRef = useRef<HTMLDivElement>(null);

    const variants = {
      visible: { opacity: 1, height: 'auto', display: 'block' },
      hidden: { opacity: 0, height: 0, display: 'none' },
    };

    const scrollToReview = () => {
      setIsReviewOpened(true);
      reviewRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      reviewRef.current?.focus();
    };

    return (
      <div className={className} {...props} ref={ref}>
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
            <a href="#ref" onClick={scrollToReview}>
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
            <Button
              appearance="ghost"
              arrow={isReviewOpened ? 'down' : 'right'}
              className={styles.reviewButton}
              onClick={() => setIsReviewOpened(!isReviewOpened)}
              aria-expanded={isReviewOpened}>
              Читать отзывы
            </Button>
          </div>
        </Card>
        <motion.div
          animate={isReviewOpened ? 'visible' : 'hidden'}
          variants={variants}
          initial="hidden">
          <Card
            color="blue"
            className={styles.reviews}
            ref={reviewRef}
            tabIndex={isReviewOpened ? 0 : -1}>
            {product.reviews.map((r) => (
              <div key={r._id}>
                <Review review={r} />
                <Divider />
              </div>
            ))}
            <ReviewForm productId={product._id} isOpened={isReviewOpened} />
          </Card>
        </motion.div>
      </div>
    );
  })
;



ProductComponent.displayName = 'Product';

export const Product=motion(ProductComponent)
