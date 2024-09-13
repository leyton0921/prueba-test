import Image from "next/image";
import styles from "./page.module.css";
import RegisterForm from "./components/register";

export default function Home() {
  return (
    <div className={styles.page}>
    <RegisterForm/>
    </div>
  );
}
