import { Link } from "react-router-dom";
import style from "../ErrorPage/ErrorPage.module.scss";

function ErrorPage() {
  return (
    <div className={style.container}>
      <img src="src/images/error.jpg" alt="404 Error" className={style.image} />
      <h1 className={style.title}>Страница не найдена</h1>
      <p className={style.text}>
        Извините, запрошенная страница не существует.
      </p>
      <Link to="/" className={style.link}>
        Вернуться на главную
      </Link>
    </div>
  );
}

export default ErrorPage;
