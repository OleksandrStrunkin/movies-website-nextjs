
import Menu from "../Navigate/Navigate";
import styles from "./Header.module.css";

export default function Header() {

  return (
    <div className={`${styles.header} bg-slate-800`}>
      <Menu/>
    </div>
  );
}