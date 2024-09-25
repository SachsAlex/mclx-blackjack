import styles from "./Chip10.module.css";

function Chip10({ onClick, className }) {
  return (
    <div className={`${styles.chip10} ${className}`} onClick={onClick}>
      <img src="/images/chips/Chip_10-removebg-preview.webp" alt="Chip10" />
    </div>
  );
}

export default Chip10;
