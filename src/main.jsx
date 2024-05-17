import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../src/style/index.module.scss";
import { WordsContextComponent } from "./Context/WordsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WordsContextComponent>
      <App />
    </WordsContextComponent>
  </React.StrictMode>
);
