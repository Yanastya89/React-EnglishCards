import React, { useState } from "react";
import Card from "../Card/Card";
import wordsData from "../../data/wordlist.json";
import style from "../CardSlider/cardSlider.module.scss";

function CardSlider() {
  const [countSlide, setCountSlide] = useState(0);
  const totalSlides = wordsData.length;

  function prevSlide() {
    setCountSlide((prevCount) => Math.max(0, prevCount - 1));
  }

  function nextSlide() {
    setCountSlide((prevCount) => Math.min(prevCount + 1, totalSlides - 1));
  }

  return (
    <div className={style.cardwrapper}>
      <button
        className={style.btn}
        onClick={prevSlide}
        disabled={countSlide === 0}
      >
        &lt;
      </button>
      <Card key={wordsData[countSlide].id} {...wordsData[countSlide]} />
      <button
        className={style.btn}
        onClick={nextSlide}
        disabled={countSlide === totalSlides - 1}
      >
        &gt;
      </button>
    </div>
  );
}

export default CardSlider;
