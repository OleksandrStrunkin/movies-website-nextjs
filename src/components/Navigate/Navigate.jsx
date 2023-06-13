import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import Logo from "../../../public/image/logo.svg";
import styles from "./Navigate.module.css";

export default function Menu({ fixed }) {
  const router = usePathname();

  return (
    <>
      <nav className={`${fixed ? styles.fixedNav : styles.listNav}`}>
        <Link href="/">
          <Image className={styles.logo} src={Logo} alt="Logo" />
        </Link>
        <div className={`${fixed ? styles.fixedLinks : styles.links}`}>
          <Link
            href="/cinema"
            className={`${styles.listNav_item} ${
              router === "/cinema" ? styles.active : ""
            }`}
          >
            Cinema
          </Link>
          <Link
            href="/anime"
            className={`${styles.listNav_item} ${
              router === "/anime" ? styles.active : ""
            }`}
          >
            Anime
          </Link>
          <Link
            href="/serials"
            className={`${styles.listNav_item} ${
              router === "/serials" ? styles.active : ""
            }`}
          >
            Serials
          </Link>
        </div>
      </nav>
    </>
  );
}
