import { Locale } from "@/i18n-config";
import styles from "../page.module.css";
import HomePage from "./dashboard/homePage";
import { getDictionary } from "../get-dictionary";

const Home = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang);

  return (
    <main className={styles.main}>
      <HomePage dict={dictionary} />
    </main>
  );
};

export default Home;
