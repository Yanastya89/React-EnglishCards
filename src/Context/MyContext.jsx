import { createContext, useState, useEffect } from "react";
import GetWordsService from "../Services/GetWordsService";
import Spiner from "../component/Spiner/Spiner";
import style from "../Context/myContext.module.scss";

export const MyContext = createContext();

export function MyContextComponent({ children }) {
  const [dataServer, setDataServer] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getWordsServer() {
      try {
        const wordsServer = await GetWordsService.getWords();
        setDataServer(wordsServer);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching words:", error);
        setLoading(false);
      }
    }
    getWordsServer();
  }, []);

  if (loading) {
    return (
      <div className={style.wrapper}>
        <p>Data is loading</p>
        <Spiner />
      </div>
    );
  }

  const value = { dataServer, setDataServer };

  return <MyContext.Provider value={value}> {children}</MyContext.Provider>;
}
