import { FC, DetailedHTMLProps, HTMLAttributes, ReactNode, forwardRef } from 'react';
import styles from './Card.module.css';
import cn from 'classnames';

interface ICardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  color?: 'white' | 'blue';
  children: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, ICardProps>(
  ({ color = 'white', children, className, ...props }, ref) => {
    return (
      <div
        className={cn(styles.card, className, {
          [styles.blue]: color == 'blue',
        })}
        ref={ref}
        {...props}>
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';
