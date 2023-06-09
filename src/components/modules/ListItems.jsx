import Link from "next/link"
import styles from "./ListItem.module.css"


export default function ListItems ({poster, title, id, overview, rate}){
    return (         
            <li key={id} className={styles.card}>
             <Link href={`/cinema/${id}`}>
               <div className={styles.film}>
                  <img
                    src={poster}
                    alt="images"
                  />
                  <div className={styles.film_overlay}>
                    <h3>Discription:</h3>
                    <p>{overview}</p>
                    <p>Rate: {rate}</p>
                  </div>
               </div>
                <p className={styles.title_film}>{title}</p>
             </Link>
            </li>
    )
}