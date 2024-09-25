import styles from "./Chip5.module.css";

function Chip5({ onClick, className }) {
  return (
    <div className={`${styles.chip5} ${className}`} onClick={onClick}>
      <img src="/images/chips/Chip_5-removebg-preview.webp" alt="Chip5" />
    </div>
  );
}

export default Chip5;
