import style from "./mainPage.module.scss";
import Table from "../Table/Table";
import CardSlider from "../CardSlider/CardSlider";
export default function MainPage() {
  return (
    <main className={style.main}>
      <div className={style.cardWrapper}>
        <div className={style.cardText}> {<CardSlider />} </div>
        <img
          src="../../../public/images/Card.png"
          alt="Card"
          className={style.cardImage}
        />
      </div>

      {<Table />}
    </main>
  );
}
