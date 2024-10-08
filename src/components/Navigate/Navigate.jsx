"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

import Logo from "../../../public/image/logo.svg";
import openMenu from "../../../public/image/openMenu.svg"
import styles from "./Navigate.module.css";
import MobileMenu from "../MobileMenu/MobileMenu";
import SearchSinema from "../modules/SearchSInema";


export default function Menu() {
  const router = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="flex justify-between items-center text-white">
        <div className="flex items-center">
          <Link href="/cinema">
            <Image className={styles.logo} src={Logo} alt="Logo" />
          </Link>
          <SearchSinema/>
        </div>
        <div className={styles.links}>
          <Link
            href="/cinema"
            className={`${'flex'} ${
              router === "/cinema" ? "text-current" : ""
            }`}
          >
            Cinema
          </Link>
          <Link
            href="/anime"
            className={`${''} ${
              router === "/anime" ? "text-current" : ""
            }`}
          >
            Anime
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
