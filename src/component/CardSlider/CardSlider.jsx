import React, { useState } from "react";
import Card from "../Card/Card";
import style from "../CardSlider/cardSlider.module.scss";
import Spiner from "../Spiner/Spiner.jsx";
import { inject, observer } from "mobx-react";

const CardSlider = inject("wordsStore")(
  observer(({ wordsStore }) => {
    const { dataServer, loading } = wordsStore;
    const totalSlides = dataServer.length;
    const [countSlide, setCountSlide] = useState(0);
    const currentWord = dataServer[countSlide];
    const [wordsLearned, setWordsLearned] = useState(0);
    const [wordsAlreadyLearned, setWordsAlreadyLearned] = useState({});

    function handleLearned() {
      if (!wordsAlreadyLearned[currentWord.id]) {
        setWordsLearned((prevCount) => prevCount + 1);
        setWordsAlreadyLearned((prevLearned) => ({
          ...prevLearned,
          [currentWord.id]: true,
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

    if (loading) {
      return (
        <div className={style.wrapper}>
          <p>Data is loading</p>
          <Spiner />
        </div>
      );
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
            key={currentWord.id}
            countslide={countSlide}
            {...currentWord}
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
  })
);

export default CardSlider;
