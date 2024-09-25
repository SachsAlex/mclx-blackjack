import styles from "./Chip25.module.css";

function Chip25({ onClick, className }) {
  return (
    <div className={`${styles.chip25} ${className}`} onClick={onClick}>
      <img src="/images/chips/Chip_25-removebg-preview.webp" alt="Chip25" />
    </div>
  );
}

export default Chip25;
