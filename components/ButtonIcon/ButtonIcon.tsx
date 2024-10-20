import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import styles from './ButtonIcon.module.css';
import up from './up.svg';
import close from './close.svg';
import menu from './menu.svg';
import cn from 'classnames';

const icons = {
  up,
  close,
  menu,
};

type IconName = keyof typeof icons;

interface IButtonIconProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  icon: IconName;
  appearance: 'primary' | 'white';
}

export const ButtonIcon: FC<IButtonIconProps> = ({ icon, appearance, className, ...props }) => {
  const IconComp = icons[icon];
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearance == 'primary',
        [styles.white]: appearance == 'white',
      })}
      {...props}>
      <IconComp />
    </button>
  );
};
