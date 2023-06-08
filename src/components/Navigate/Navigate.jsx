import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/image/logo.svg"
import styles from "./Navigate.module.css"


export default function Menu () {
    return (
        <>
        <nav className={styles.listNav}>
            <Link href="/" className={styles.logo}><Image src={Logo} alt="Logo" /></Link>
            <div className={styles.links}>
                <Link href="/cinema" className={styles.listNav_item}>Cinema</Link>
                <Link href="/anime" className={styles.listNav_item}>Anime</Link>
                <Link href="/serials" className={styles.listNav_item}>Serials</Link>
            </div>
        </nav>
        </>
    )
}