import React, { useState, forwardRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import styles from "./Input.module.css";

interface InputProps {
  type?: string;
  name: string;
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, error }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className={styles.input__container}>
        <div className={styles.input__wrapper}>
          <input
            className={`${styles.input} ${
              type === "password" ? styles.input_password : null
            } ${error ? styles.input_error_border : null}`}
            type={showPassword ? "text" : type}
            name={name}
            placeholder=" "
            ref={ref}
            autoComplete="off"
          />
          <label htmlFor={label} className={styles.input__label}>
            {label}
          </label>
          {type === "password" &&
            (showPassword ? (
              <FaEye
                className={styles.input__password_icon}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEyeSlash
                className={styles.input__password_icon}
                onClick={() => setShowPassword(true)}
              />
            ))}
        </div>
        <span className={styles.input__error}>{error}</span>
      </div>
    );
  }
);
