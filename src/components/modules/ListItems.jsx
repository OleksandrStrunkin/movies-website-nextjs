import Link from "next/link"
import { usePathname } from 'next/navigation';
import styles from "./ListItem.module.css"
import Image from "next/image"


export default function ListItems ({poster, title, id, overview, rate}){
    const router = usePathname();
    let adress = router.toString();


    return (         
            <li key={id} className="flex w-full mt-8 border border-slate-600 rounded-md">
             <Link href={`${adress}/${id}`}>
               <div className={styles.film}>
                  <img
                    src={poster}
                    alt="images"
                  
                   
                    className="w-full object-cover object-center"
                  />
                  <div className={styles.film_overlay}>
                    <h3>Discription:</h3>
                    <p className={styles.descr}>{overview}</p>
                    <p>Rate: {rate}</p>
                  </div>
               </div>
                <h2 className={styles.title_film}>{title}</h2>
             </Link>
            </li>
    )
}

{/* <Image
src={poster}
alt="images"
width={250}
height={350}
className="w-full object-cover object-center"
/> */}