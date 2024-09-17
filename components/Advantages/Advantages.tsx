import React, { FC } from 'react'
import { TopPageAdvantage } from '../../interfaces/page.interface';
import styles from "./Advantages.module.css";
import CheckIcon from './check.svg';


interface AdvantagesProps {
	advantages: TopPageAdvantage[]
}

export const Advantages:FC<AdvantagesProps> = ({advantages}) => {
  return (
    <>
    {advantages.map(a => (
      <div key={a._id} className={styles.advantage}>
        <CheckIcon />
        <div className={styles.title}>{a.title}</div>
        <hr className={styles.vline} />
        <div>{a.description}</div>
      </div>
    ))}
  </>
  )
}
