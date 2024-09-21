import React, { DetailedHTMLProps, FC, forwardRef, TextareaHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form';
import cn from 'classnames';
import styles from "./Textarea.module.css"

interface ITextareaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
	error?: FieldError;
}


export const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <div className={cn(styles.textareaWrapper, className)}>
        <textarea
          className={cn(styles.textarea, {
            [styles.error]: error,
          })}
          ref={ref}
          {...props}

        />
        {error && (
          <span role='alert' className={styles.errorMessage}>
            {error.message}
          </span>
        )}
      </div>
    );
  }
);


Textarea.displayName = 'Textarea';
