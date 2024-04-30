import React, { useRef } from "react";
import style from "./translateButton.module.scss";

function TranslateButton({ onClick }) {
  const btnElem = useRef(null);

  React.useEffect(() => {
    btnElem.current?.focus?.();
  }, []);

  return (
    <button ref={btnElem} onClick={onClick} className={style.translateButton}>
      Показать перевод
    </button>
  );
}

export default TranslateButton;
