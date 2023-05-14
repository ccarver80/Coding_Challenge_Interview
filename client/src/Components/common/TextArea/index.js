import React from "react";
import styles from "./styles.module.css";

export const TextArea = ({ label, register, name, placeholder, rows }) => {
  return (
    <div className={styles.TextArea}>
      <label>{label}</label>
      <textarea
        {...register(`${name}`)}
        rows={rows}
        placeholder={placeholder}
      />
    </div>
  );
};
