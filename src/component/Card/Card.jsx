import style from "./card.module.scss";
import React, { useState } from "react";

function Card(props) {
  const { english, transcription, russian } = props;

  const [showTranslate, setShowTranslate] = useState(false);
  const handleTanslate = () => {
    setShowTranslate(!showTranslate);
  };

  return (
    <div className={style.card}>
      <div className={style.cardBody}>
        <h3> {english}</h3>
        <p className={style.transcription}>{transcription}</p>
        {showTranslate ? (
          <p className={style.translate}> {russian} </p>
        ) : (
          <button onClick={handleTanslate} className={style.translateButton}>
            Показать перевод
          </button>
        )}
      </div>
    </div>
  );
}

export default Card;
