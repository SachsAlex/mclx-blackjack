import styles from "./ChipAll.module.css";

function ChipAll({ onClick, className }) {
  return (
    <div className={`${styles.chipAll} ${className}`} onClick={onClick}>
      <img src="/images/chips/MCLX.webp" alt="ChipAll" />
    </div>
  );
}

export default ChipAll;
