import style from "./card.module.scss";
import React, { useState, useRef, useEffect } from "react";

function Card(props) {
  const { english, transcription, russian, countSlide, handleLearned } = props;
  const [showTranslate, setShowTranslate] = useState(false);
  const btnElem = useRef(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      btnElem.current.focus();
    }, 1500);
    return () => clearTimeout(timeoutId);
  }, [countSlide]);

  const handleTranslate = () => {
    setShowTranslate(!showTranslate);
    handleLearned();
  };

  return (
    <div className={style.card}>
      <div className={style.cardBody}>
        <h3> {english}</h3>
        <p className={style.transcription}>{transcription}</p>
        {showTranslate ? (
          <p className={style.translate}> {russian} </p>
        ) : (
          <button
            ref={btnElem}
            onClick={handleTranslate}
            className={style.translateButton}
          >
            Показать перевод
          </button>
        )}
      </div>
    </div>
  );
}

export default Card;
