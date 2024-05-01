import React, { useState } from "react";
import Card from "../Card/Card";
import wordsData from "../../data/wordlist.json";
import style from "../CardSlider/cardSlider.module.scss";

function CardSlider() {
  const [countSlide, setCountSlide] = useState(0);
  const totalSlides = wordsData.length;
  const [wordsLearned, setWordsLearned] = useState(0);
  const [wordsAlreadyLearned, setWordsAlreadyLearned] = useState([]);

  function handleLearned() {
    if (!wordsAlreadyLearned[wordsData[countSlide].id]) {
      setWordsLearned((prevCount) => prevCount + 1);
      setWordsAlreadyLearned((prevLearned) => ({
        ...prevLearned,
        [wordsData[countSlide].id]: true,
      }));
    }
  }

  function prevSlide() {
    setCountSlide((prevCount) => Math.max(0, prevCount - 1));
  }

  function nextSlide() {
    setCountSlide((prevCount) => Math.min(prevCount + 1, totalSlides - 1));
  }

  function EndOfWord(wordsCount) {
    const lastNumber = wordsCount % 10;
    const lastTwoNumbers = wordsCount % 100;
    switch (true) {
      case lastTwoNumbers >= 11 && lastTwoNumbers <= 14:
        return "слов";
      case lastNumber === 1:
        return "слово";
      case lastNumber >= 2 && lastNumber <= 4:
        return "слова";
      default:
        return "слов";
    }
  }

  return (
    <>
      <div className={style.cardwrapper}>
        <button
          className={style.btn}
          onClick={prevSlide}
          disabled={countSlide === 0}
        >
          &lt;
        </button>
        <Card
          key={wordsData[countSlide].id}
          countslide={countSlide}
          {...wordsData[countSlide]}
          handleLearned={handleLearned}
        />
        <button
          className={style.btn}
          onClick={nextSlide}
          disabled={countSlide === totalSlides - 1}
        >
          &gt;
        </button>
      </div>
      <div className={style.count}>
        <p>
          {countSlide + 1}/{totalSlides}
        </p>
      </div>
      <div className={style.info}>
        <p>
          Изучено: {wordsLearned} {EndOfWord(wordsLearned)}
        </p>
        <p>
          {wordsLearned === totalSlides
            ? "Вы изучили все слова!"
            : `Осталось изучить ${totalSlides - wordsLearned} ${EndOfWord(
                totalSlides - wordsLearned
              )}`}
        </p>
      </div>
    </>
  );
}

export default CardSlider;