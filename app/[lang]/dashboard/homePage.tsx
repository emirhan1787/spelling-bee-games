"use client";
import React, { useState } from "react";
import Navbar from "../components/navBar";
import GameBoard from "../components/GameBoard";
import styles from "@/app/page.module.css";

const Home = ({ dict }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.homePage}>
      <Navbar toggle={toggleMenu} dict={dict} />
      <GameBoard dict={dict} />
    </div>
  );
};

export default Home;
