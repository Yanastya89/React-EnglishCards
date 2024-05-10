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

  const addWord = async (newWord) => {
    try {
      const resp = await fetch(
        "http://itgirlschool.justmakeit.ru/api/words/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newWord),
        }
      );
      if (!resp.ok) {
        throw new Error(`Failed to add word: ${resp.statusText}`);
      }
      const addedWord = await resp.json();
      setDataServer([...dataServer, addedWord]);
    } catch (error) {
      console.error("Error adding word:", error);
    }
  };

  const deleteWord = async (id) => {
    try {
      const resp = await fetch(
        `http://itgirlschool.justmakeit.ru/api/words/${id}/delete`,
        {
          method: "POST",
        }
      );
      if (!resp.ok) {
        throw new Error(`Failed to delete word: ${resp.statusText}`);
      }
      setDataServer(dataServer.filter((word) => word.id !== id));
    } catch (error) {
      console.error("Error deleting word:", error);
    }
  };

  const updateWord = async (id, updatedWord) => {
    try {
      const requestBody = {
        english: updatedWord.english,
        russian: updatedWord.russian,
        transcription: updatedWord.transcription,
        tags: updatedWord.tags || "",
        id: updatedWord.id || "",
        tags_json: updatedWord.tags_json || "",
      };
      const resp = await fetch(
        `http://itgirlschool.justmakeit.ru/api/words/${id}/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      if (!resp.ok) {
        throw new Error(`Failed to update word: ${resp.statusText}`);
      }
      await fetchDataFromServer();
    } catch (error) {
      console.error("Error updating word:", error);
    }
  };

  if (loading) {
    return (
      <div className={style.wrapper}>
        <p>Data is loading</p>
        <Spiner />
      </div>
    );
  }

  const value = { dataServer, setDataServer, addWord, deleteWord, updateWord };

  return <MyContext.Provider value={value}> {children}</MyContext.Provider>;
}
