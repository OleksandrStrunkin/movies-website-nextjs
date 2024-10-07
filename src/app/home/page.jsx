import styles from "./HomePage.module.css";
import Image from "next/image";
import main from "../../../public/image/main3.jpg";
import CinemaList from "../../components/CinemaPage/CinemaPage";

export default function HomePage() {
  return (
    <>
      <CinemaList/>
    </>
  );
}
