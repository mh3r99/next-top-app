import React, { DetailedHTMLProps, FC, InputHTMLAttributes, forwardRef } from 'react';
import cn from 'classnames';
import { FieldError } from 'react-hook-form';
import styles from './Input.module.css';

interface IInputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  error?: FieldError;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(({ className, error, ...props }, ref) => {
  return (
    <div className={cn(className, styles.inputWrapper)}>
      <input
        className={cn(styles.input, {
          [styles.error]: error,
        })}
        ref={ref}
        {...props}
      />
      {error && (
        <span role="alert" className={styles.errorMessage}>
          {error.message}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

