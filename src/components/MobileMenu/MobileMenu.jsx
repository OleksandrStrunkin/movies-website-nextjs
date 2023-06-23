import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./MobileMenu.module.css";
import Image from "next/image";

import closeMenu from "../../../public/image/closeMenu.svg";
import Logo from "../../../public/image/logo.svg";

export default function MobileMenu({ isOpen, toggleMenu }) {
  const router = usePathname();

  return (
    <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
      <button className={styles.closeButton} onClick={toggleMenu}>
        <Image className={styles.menuLogo} src={closeMenu} alt="Logo" />
      </button>
      <div className={styles.menuLinks}>
        <Link href="/">
          <Image className={styles.logo} src={Logo} alt="Logo" onClick={toggleMenu}/>
        </Link>
        <Link
          href="/cinema"
          className={`${styles.listNav_item} ${
            router === "/cinema" ? styles.active : ""
          }`}
          onClick={toggleMenu}
        >
          Cinema
        </Link>
        <Link
          href="/anime"
          className={`${styles.listNav_item} ${
            router === "/anime" ? styles.active : ""
          }`}
          onClick={toggleMenu}
        >
          Anime
        </Link>
        <Link
          href="/serials"
          className={`${styles.listNav_item} ${
            router === "/serials" ? styles.active : ""
          }`}
          onClick={toggleMenu}
        >
          Serials
        </Link>
      </div>
    </div>
  );
}
