import styles from "./Card.module.css";

export const Card = ({ data, openModal, selectCard }) => {
  const handleClick = () => {
    selectCard(data.name);
    openModal();
  };
  return (
    <div className={styles.card_wrap}>
      <div className={styles.card_content}>
        <span className={styles.card_category}>{data.category}</span>
        <span className={styles.card_title}>{data.name}</span>
        <div className={styles.card_block}>
          <div className={styles.price_block}>
            <span className={styles.card_dollar}>&#36;</span>
            <span className={styles.card_price}>{data.price}</span>
          </div>
          <button onClick={handleClick} className={styles.card_button}>
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};
