import React from "react";
import style from "./header.module.scss";

function Header() {
  return (
    <header className={style.header}>
      <div className={style.logo}>
        <img src="../../../public/images/logo.svg" alt="Logo" />
      </div>
      <div className={style.nav}>
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
