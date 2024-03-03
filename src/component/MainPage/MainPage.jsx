import React, { useState } from "react";
import wordsData from "../../data/wordlist.json";
import style from "./mainPage.module.scss";
import Table from "../Table/Table";
import CardSlider from "../CardSlider/CardSlider";

export default function MainPage() {
  const [stWords, setStWords] = useState(wordsData);

  function handleDelete(id) {
    const newStWords = stWords.filter((item) => item.id !== id);
    setStWords(newStWords);
  }

  return (
    <main className={style.main}>
      <div className={style.cardWrapper}>
        <div className={style.cardText}>
          <CardSlider />
        </div>
        <img
          src="../../../public/images/Card.png"
          alt="Card"
          className={style.cardImage}
        />
      </div>
      <Table stWords={stWords} deleteWords={handleDelete} />
    </main>
  );
}
