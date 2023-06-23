"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

import Logo from "../../../public/image/logo.svg";
import openMenu from "../../../public/image/openMenu.svg"
import styles from "./Navigate.module.css";
import MobileMenu from "../MobileMenu/MobileMenu";


export default function Menu() {
  const router = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className={styles.listNav}>
        <Link href="/">
          <Image className={styles.logo} src={Logo} alt="Logo" />
        </Link>
        <div className={styles.links}>
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
        <button className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
          <Image className={styles.menuLogo} src={openMenu} alt="logo"/>
        </button>
      </nav>
      {isMobileMenuOpen && <MobileMenu isOpen={isMobileMenuOpen}  toggleMenu={toggleMobileMenu}/>}
    </>
  );
}
