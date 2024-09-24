import React from "react";
import styles from "./Card.module.css";

const Card = ({ number, suit, imgSource }) => {
  const combo = number ? `${number}${suit}` : null;
  const color = suit === "♦" || suit === "♥" ? "card-red" : "card";
  return (
    <td className={styles.cardcontainer}>
      <img src={imgSource} className="" alt="card"></img>
      <div className={color}>{combo}</div>
    </td>
  );
};
export default Card;
