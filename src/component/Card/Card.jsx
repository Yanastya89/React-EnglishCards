import style from "./card.module.scss";
import React, { useState, useContext } from "react";
import TranslateButton from "../TranslateButton/TranslateButton";
import { MyContext } from "../../Context/MyContext";
import Spiner from "../Spiner/Spiner";

function Card() {
  const { dataServer } = useContext(MyContext);
  const [showTranslate, setShowTranslate] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const handleTranslate = () => {
    setShowTranslate(!showTranslate);
  };

  const currentWord = dataServer[currentWordIndex];

  if (!currentWord) {
    return (
      <div>
        <p>Data is loading</p>
        <Spiner />
      </div>
    );
  }
  return (
    <div className={style.card}>
      <div className={style.cardBody}>
        <h3>{currentWord.english}</h3>
        <p className={style.transcription}>{currentWord.transcription}</p>
        {showTranslate ? (
          <p className={style.translate}>{currentWord.russian}</p>
        ) : (
          <TranslateButton onClick={handleTranslate} />
        )}
      </div>
    </div>
  );
}

export default Card;
