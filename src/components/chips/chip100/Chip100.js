import styles from "./Chip100.module.css";

function Chip100({ onClick, className }) {
  return (
    <div className={`${styles.chip100} ${className}`} onClick={onClick}>
      <img src="/images/chips/Chip_100-removebg-preview.webp" alt="Chip100" />
    </div>
  );
}

export default Chip100;
