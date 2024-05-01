import style from "./header.module.scss";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.svg";
import Search from "../../images/search.svg";

function Header() {
  return (
    <header className={style.header}>
      <div className={style.logo}>
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className={style.nav}>
        <Link to="/game">Страница с карточками</Link>

        <div className={style.search}>
          <img src={Search} alt="Search" />
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
