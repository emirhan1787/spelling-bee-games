import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import styles from "@/app/page.module.css";
import { IconMenu } from "@tabler/icons-react";
import { getDictionary } from "@/app/get-dictionary";

type Props = {
  toggle: () => void;
  dict: any;
};

const Navbar = ({ toggle, dict }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (lang: string) => {
    window.location.pathname = `/${lang}`;
  };

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.menuInner}>
          <div className={styles.menubck}>
            <IconMenu
              className={styles.icon}
              onClick={() => {
                handleToggle();
                toggle();
              }}
            />
            {isOpen && (
              <ul className={styles.menuList}>
                <div className={styles.languageSwitcher}>
                  {window.location.pathname === "/en" && (
                    <span onClick={() => changeLanguage("tr")}>{dict?.turkish}</span>
                  )}
                  {window.location.pathname === "/tr" && (
                    <span onClick={() => changeLanguage("en")}>{dict?.english}</span>
                  )}
                </div>
              </ul>
            )}
          </div>
        </div>

        <h2 className={styles.githubWithA}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={window.location.pathname ==="/en" ? "https://github.com/emirhan1787/spelling-bee-games/blob/master/app/%5Blang%5D/components/wordsen.tsx" :"https://github.com/emirhan1787/spelling-bee-games/blob/master/app/%5Blang%5D/components/wordstr.tsx"}>
          {dict?.answers}
          </a>
          /
          <a
            href="https://github.com/emirhan1787"
            target="_blank"
            rel="noopener noreferrer"
          >
            gitHub
          </a>
        </h2>
      </div>
    </>
  );
};

export default Navbar;