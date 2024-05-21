import React, { useState, useEffect } from "react";
import styles from "@/app/page.module.css";
import { IconEye } from "@tabler/icons-react";

interface MatchedListProps {
  matchedWords: string[];
  remainingWords: number;
  dict: any;
}

const MatchedList: React.FC<MatchedListProps> = ({
  dict,
  matchedWords,
  remainingWords,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 720);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.matchedWords}>
      <div className={styles.remainingWords}>
        <h3>{dict?.remainingwords}: {remainingWords}</h3>
        {isMobile && (
          <IconEye 
            style={{ cursor: "pointer" }}
            onClick={toggleList}
          > 
          </IconEye>
        )}
      </div>

      {(!isMobile || isOpen) && (
        <div className={styles.matchedWordsPanel}>
          <div className={styles.matchedWordsList}>
            {matchedWords.map((word, index) => (
              <p key={index}>{word}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchedList;