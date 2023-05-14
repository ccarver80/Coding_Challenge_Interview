import React from "react";
import styles from "./styles.module.css";

export default function Radio({ lable, register, name, value }) {
  return (
    <div className={styles.Radio}>
      <label>{lable}</label>
      <input {...register(`${name}`)} value={value} type="radio" />
    </div>
  );
}
