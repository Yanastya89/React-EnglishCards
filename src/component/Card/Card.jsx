import style from "./card.module.scss";
import React, { useState } from "react";
import TranslateButton from "../TranslateButton/TranslateButton";

function Card({ english, transcription, russian, handleLearned }) {
  const [showTranslate, setShowTranslate] = useState(false);

  const handleTranslate = () => {
    setShowTranslate(!showTranslate);
    handleLearned();
  };

  return (
    <div className={style.card}>
      <div className={style.cardBody}>
        <h3 className={style.word}>{english}</h3>
        <p className={style.transcription}>{transcription}</p>
        {showTranslate ? (
          <p className={style.translate}>{russian}</p>
        ) : (
          <TranslateButton onClick={handleTranslate} />
        )}
      </div>
    </div>
  );
}

export default Card;
