"use client"
import { useState } from "react";
import styles from "./VertMenu.module.css";

const VerticalMenu = () => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const handleMouseEnter = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div
    className={`${styles.verticalMenu} ${subMenuOpen ? styles.open : ""}`}
      onClick={handleMouseEnter}
    >
      <div className={styles.menuItem1}>
          <div className={styles.menuItem}>Item 1</div>
          <div className={styles.menuItem}>Item 2</div>
          <div className={styles.menuItem}>Item 3</div>
          <div className={styles.menuItem}>Item 1</div>
          
      </div>
        {subMenuOpen && (
        <div className={styles.subMenu}>
          <div className={styles.subMenuItem}>Sub Item 1</div>
          <div className={styles.subMenuItem}>Sub Item 2</div>
          <div className={styles.subMenuItem}>Sub Item 3</div>
        </div>
      )}

    </div>
  );
};

export default VerticalMenu;