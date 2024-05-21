import React, { useState, useEffect } from "react";
import wordsEN from "./wordsen";
import wordsTR from "./wordstr";
import MatchedList from "./MatchedList";
import Modal from "./modal";
import styles from "@/app/page.module.css";
import { IconRotate } from "@tabler/icons-react";

const GameBoard = ({ dict, lang }: any) => {
  let letters = ["A", "B", "C", "D", "E", "F", "G"];
  if (window.location.pathname === "/tr") {
    letters = ["A", "E", "K", "L", "İ", "R", "T"];
  }

  window.location.pathname ==="/en"
  const words = window.location.pathname ==="/en" ? wordsEN : wordsTR;

  const initialTime = 60;
  const [time, setTime] = useState<number>(initialTime);
  const [userWord, setUserWord] = useState<string>("");
  const [matchedWords, setMatchedWords] = useState<string[]>([]);
  const [remainingWords, setRemainingWords] = useState<number>(words.length);
  const [score, setScore] = useState<number>(0);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [didWin, setDidWin] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerStarted && time > 0) {
      timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (time === 0) {
      endGame(false);
    }

    return () => clearTimeout(timer);
  }, [time, timerStarted]);

  useEffect(() => {
    if (remainingWords === 0) {
      endGame(true);
    }
  }, [remainingWords]);

  const endGame = (win: boolean) => {
    setIsGameOver(true);
    setShowModal(true);
    setDidWin(win);
    setTimerStarted(false);
    if (time > 0) {
      setScore((prevScore) => prevScore + time * 10);
    }
  };

  const restartGame = () => {
    setTime(initialTime);
    setUserWord("");
    setMatchedWords([]);
    setRemainingWords(words.length);
    setScore(0);
    setTimerStarted(false);
    setIsGameOver(false);
    setShowModal(false);
    setDidWin(false);
  };

  const handleLetterClick = (letter: string) => {
    setUserWord(userWord + letter);
    if (!timerStarted) {
      setTimerStarted(true);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      checkWord();
    } else if (event.key === "Backspace") {
      setUserWord((prevWord) => prevWord.slice(0, -1));
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value;

    input = input.replace(/i/g, "İ");
    const isValidInput = input
      .toUpperCase() 
      .split("")
      .every((char) => {
        const upperCaseChar = char.toUpperCase();
        return letters.includes(upperCaseChar);
      });
    if (isValidInput) {
      setUserWord(input.toUpperCase()); 
      if (!timerStarted) {
        setTimerStarted(true);
      }
    } else {
      alert("Sadece mevcut harfleri kullanabilirsiniz!");
    }
  };

  const checkWord = () => {
    if (
      userWord.length > 0 &&
      words.includes(userWord) &&
      !matchedWords.includes(userWord)
    ) {
      const wordLength = userWord.length;
      setMatchedWords([...matchedWords, userWord]);
      setRemainingWords(remainingWords - 1);
      setScore(score + wordLength * 10 + 50);
      setUserWord("");
      setTime(time + 15);
    }
    setUserWord("");
  };

  return (
    <div className={styles.gameBoard}>
      <div className={styles.scoreTimer}>
        <p>{dict?.time}: {time} {dict?.second}</p>
        <p>{dict?.score}: {score}</p>
      </div>
      <div className={styles.boardMain}>
        <div className={styles.hexagonContainer}>
          {letters.map((letter, index) => (
            <div
              key={index}
              className={styles.hexagon}
              onClick={() => handleLetterClick(letter)}
            >
              <p>{letter}</p>
            </div>
          ))}
        </div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder={dict?.enterword}
            value={userWord}
            onChange={handleInputChange}
            onKeyUp={handleKeyPress}
            className={styles.textInput}
          />
          <div className={styles.btnArea}>
            <button
              onClick={() => setUserWord((prevWord) => prevWord.slice(0, -1))}
              className={styles.checkButton}
            >
              {dict?.delete}
            </button>
            <button onClick={checkWord} className={styles.checkButton}>
              {dict?.check}
            </button>
          </div>
          <h3>{dict?.restart}</h3>
          <IconRotate onClick={restartGame} className={styles.restartButton} />
        </div>
      </div>
      <div className={styles.sidePanel}>
        <MatchedList
        dict={dict}
          matchedWords={matchedWords}
          remainingWords={remainingWords}
        />{" "}
        
      </div>
      <Modal
      dict={dict}
        showModal={showModal}
        restartGame={restartGame}
        score={score}
        didWin={didWin}
      />
    </div>
  );
};

export default GameBoard;