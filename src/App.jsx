import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import { Game, Main, Error, UserPage } from "./pages";
import style from "./style/index.module.scss";

function App() {
  return (
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
  );
}

export default App;
