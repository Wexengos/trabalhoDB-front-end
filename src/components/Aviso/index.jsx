import styles from "./styles.module.scss";

export default function Aviso({ coord_name, date, content }) {
  return (
    <div className={styles.aviso}>
      <h1 className={styles.authorName}>{coord_name}</h1>
      <p>{content}</p>
      <p>{date}</p>
    </div>
  );
}
