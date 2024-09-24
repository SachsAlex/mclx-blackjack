import React from "react";
import styles from "./Card.module.css";
import backside from "../../mediathek/backside.json";

const Card = ({ imgSource }) => {
  return (
    <td className={styles.cardcontainer}>
      <img
        src={imgSource || backside[0].img}
        className={styles.card}
        alt="card"
      ></img>
    </td>
  );
};
export default Card;
