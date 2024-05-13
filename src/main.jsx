import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../src/style/index.module.scss";
import { MyContextComponent } from "./Context/MyContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MyContextComponent>
      <App />
    </MyContextComponent>
  </React.StrictMode>
);
