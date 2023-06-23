import styles from "./HomePage.module.css";
import Image from "next/image";
import main from "../../../public/image/main3.jpg";
import main1 from "../../../public/image/main1.jpg";
import main2 from "../../../public/image/main2.jpg";
import main3 from "../../../public/image/main4.jpg";

export default function HomePage() {
  return (
    <>
      <div className={styles.main}>
        <Image src={main} alt="main"
        layout="fill"
        objectFit="cover"
        objectPosition="center" 
        className={styles.poster}/>
      </div>
    </>
  );
}
