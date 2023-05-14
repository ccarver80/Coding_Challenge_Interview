import React from "react";
import styles from "./styles.module.css";

export function CheckBox({
  label,
  register,
  name,
  value,
  placeholder,
  pattern,
}) {
  return (
    <div className={styles.CheckBox}>
      <input
        {...register(`${name}`)}
        type="checkbox"
        value={value}
        placeholder={placeholder}
        pattern={pattern}
      />
      <label>{label}</label>
    </div>
  );
}
