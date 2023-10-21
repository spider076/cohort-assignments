import { Signup } from "ui";
import styles from "./page.module.css";

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <h1>Hello World !</h1>
      <Signup />
    </main>
  );
}
