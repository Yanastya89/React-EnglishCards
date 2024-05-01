import style from "./mainPage.module.scss";
import CardSlider from "../CardSlider/CardSlider";
import cardImg from "../../images/Card.png";

function MainPage() {
  return (
    <main className={style.main}>
      <div className={style.cardWrapper}>
        <div className={style.cardText}>
          <CardSlider />
        </div>
        <img src={cardImg} alt="Card" className={style.cardImage} />
      </div>
    </main>
  );
}

export default MainPage;
