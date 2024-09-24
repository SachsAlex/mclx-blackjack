import React from "react";
import styles from "./Card.module.css";

const Card = ({ imgSource }) => {
  return (
    <td className={styles.cardcontainer}>
      <img src={imgSource} className={styles.card} alt="card"></img>
    </td>
  );
};
export default Card;
