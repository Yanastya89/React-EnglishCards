import style from "./mainPage.module.scss";
import CardSlider from "../CardSlider/CardSlider";

function MainPage() {
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
    </main>
  );
}

export default MainPage;
