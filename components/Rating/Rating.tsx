import { DetailedHTMLProps, HTMLAttributes, useEffect, useState, KeyboardEvent } from 'react';
import styles from './Rating.module.css';
import cn from 'classnames';
import StarIcon from './star.svg';

export interface RatingProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isEditable?: boolean;
  rating: number;
  setRating?: (rating: number) => void;
}

export const Rating = ({ isEditable, rating, setRating, ...props }: RatingProps) => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

  useEffect(() => {
    constructRating(rating);
  }, [rating]);

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((_, i) => {
      return (
        <span
          key={i}
          className={cn(styles.star, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable,
          })}
          onMouseEnter={() => changeDisplay(i + 1)}
          onMouseLeave={() => changeDisplay(rating)}
          onClick={() => onClick(i + 1)}>
          <StarIcon
            tabIndex={isEditable ? 0 : -1}
            onKeyDown={(e: KeyboardEvent<SVGElement>) => isEditable && handleSpace(i + 1, e)}
          />
        </span>
      );
    });
    setRatingArray(updatedArray);
  };

  const changeDisplay = (i: number) => {
    if (!isEditable) {
      return;
    }
    constructRating(i);
  };

  const onClick = (i: number) => {
    if (!isEditable) {
      return;
    }
    setRating?.(i);
  };

  const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
    if (e.code != 'Space') {
      return;
    }
    setRating?.(i);
  };

  return (
    <div {...props}>
      {ratingArray.map((r, i) => (
        <span key={i}>{r}</span>
      ))}
    </div>
  );
};
