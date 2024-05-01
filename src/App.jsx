import Header from "./component/Header/Header";
import style from "./style/index.module.scss";
import Footer from "./component/Footer/Footer";
import { hashRouter as Router, Routes, Route } from "react-router-dom";
import { Game, Main, Error, UserPage } from "./pages";

function App() {
  return (
    <xRouter>
      <div className={style.maincontainer}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/game" element={<Game />} />
            <Route path="*" element={<Error />} />
            <Route path="/userpage" element={<UserPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </xRouter>
  );
}

export default App;
