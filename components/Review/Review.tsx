import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { ReviewModel } from '../../interfaces/product.interface';
import styles from "./Review.module.css"
import cn from 'classnames';
import { Rating } from '../Rating/Rating';
import UserIcon from "./user.svg"
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';


interface IReviewProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	review: ReviewModel;
}

export const Review:FC<IReviewProps> = ({review, className, ...props}) => {
  const { name, title, description, createdAt, rating } = review;
  return (
    <div className={cn(styles.review, className)}
    {...props}
  >
    <UserIcon className={styles.user} />
    <div className={styles.title}>
      <span className={styles.name}>{name}:</span>&nbsp;&nbsp;
      <span>{title}</span>
    </div>
    <div className={styles.date}>
      {format(new Date(createdAt), 'dd MMMM yyyy', { locale: ru })}
    </div>
    <div className={styles.rating}>
      <Rating rating={rating} />
    </div>
    <div className={styles.description}>
      {description}
    </div>
  </div>
  )
}
