import styles from "./Button.module.css";

function Button({ onClick, text, className }) {
  return (
    <div className={`${styles.myBtn} ${className}`} onClick={onClick}>
      {text}
    </div>
  );
}

export default Button;
