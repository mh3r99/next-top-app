import React, { DetailedHTMLProps, HTMLAttributes, FC } from 'react'
import styles from "./Divider.module.css"
import cn from "classnames"


interface IDividerProps extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {

}

export const Divider:FC<IDividerProps> = ({className, ...props}) => {
  return (
    <hr className={cn(className, styles.hr)} {...props} />
  )
}
