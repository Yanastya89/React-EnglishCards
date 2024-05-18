import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import { Game, Main, Error, UserPage } from "./Pages";
import { wordsStore } from "./Stores/WordsStore";
import { Provider } from "mobx-react";
import style from "./style/index.module.scss";

const stores = {
  wordsStore,
};

function App() {
  return (
    <Provider {...stores}>
      <Router>
        <div className={style.maincontainer}>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/game" element={<Game />} />
              <Route path="/userpage" element={<UserPage />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
