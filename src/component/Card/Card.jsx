import style from "./card.module.scss";

function Card(props) {
  const { english, transcription, russian } = props;
  return (
    <div className={style.card}>
      <div className={style.cardBody}>
        <h3> {english}</h3>
        <p>{transcription}</p>

        <button className={style.translateButton}>Показать перевод</button>
      </div>
    </div>
  );
}

export default Card;
