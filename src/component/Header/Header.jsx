import style from "./header.module.scss";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={style.header}>
      <div className={style.logo}>
        <Link to="/">
          <img src="../../../public/images/logo.svg" alt="Logo" />
        </Link>
      </div>
      <div className={style.nav}>
        <Link to="/game">Страница с карточками</Link>

        <div className={style.search}>
          <img src="../../../public/images/search.svg" alt="Search" />
        </div>
        <a href="#" className={style.logIn} id="login">
          Log&nbsp;In
        </a>
        <a href="#" className={style.signUp} id="signup">
          Sign&nbsp;Up
        </a>
      </div>
    </header>
  );
}

export default Header;
