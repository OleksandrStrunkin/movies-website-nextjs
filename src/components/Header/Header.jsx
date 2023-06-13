'use client'
import React, { useEffect, useState } from "react";
import Menu from "../Navigate/Navigate";
import styles from "./Header.module.css";

export default function Header() {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const headerElement = document.querySelector(".header");
      const headerHeight = headerElement ? headerElement.offsetHeight : 0;
      setIsFixed(window.pageYOffset > headerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${isFixed ? styles.fixed : styles.header}`}>
      <Menu  fixed={isFixed}/>
    </div>
  );
}