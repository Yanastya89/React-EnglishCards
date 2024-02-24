import Header from "./component/Header/Header";
import style from "./style/index.module.scss";
import Footer from "./component/Footer/Footer";
import MainPage from "./component/MainPage/MainPage";

function App() {
  return (
    <div className={style.maincontainer}>
      <Header />
      <MainPage />
      <Footer />
    </div>
  );
}

export default App;
