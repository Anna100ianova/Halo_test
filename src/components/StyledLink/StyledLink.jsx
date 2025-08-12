import styles from "./StyledLink.module.css";

export const StyledLink = ({ children, onClick }) => {
  return (
    <button className={styles.link_wrapper} onClick={onClick}>
      {children}
    </button>
  );
};
