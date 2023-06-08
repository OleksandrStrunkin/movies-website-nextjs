import styles from "./ListItem.module.css"


export default function ListItems ({poster, title, id}){
    return (         
            <li key={id} className={styles.card}>
              <img
                src={poster}
                alt="images"
              />
              <p>{title}</p>
            </li>
    )
}