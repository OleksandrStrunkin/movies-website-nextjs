import Link from "next/link"
import { usePathname } from 'next/navigation';
import styles from "./ListItem.module.css"
import Image from "next/image"


export default function ListItems ({poster, title, id, overview, rate}){
    const router = usePathname();
    let adress = router.toString();


    return (         
            <li key={id} className={styles.card}>
             <Link href={`${adress}/${id}`}>
               <div className={styles.film}>
                  <Image
                    src={poster}
                    alt="images"
                    width={250}
                    height={350}
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