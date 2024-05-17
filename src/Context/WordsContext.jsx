import { createContext, useState, useEffect } from "react";
import GetWordsService from "../Services/GetWordsService";
import Spiner from "../component/Spiner/Spiner";
import style from "../Context/wordsContext.module.scss";

export const WordsContext = createContext();

export function WordsContextComponent({ children }) {
  const [dataServer, setDataServer] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const wordsServer = await GetWordsService.getWords();
        setDataServer(wordsServer);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching words:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const addWord = async (newWord) => {
    try {
      const resp = await fetch("/api/words/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWord),
      });
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
      const resp = await fetch(`/api/words/${id}/delete`, {
        method: "POST",
      });
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
      const currentWord = dataServer.find((word) => word.id === id);
      if (!currentWord) {
        throw new Error(`Word with id ${id} not found`);
      }
      const requestBody = {
        english:
          updatedWord.english !== undefined
            ? updatedWord.english
            : currentWord.english,
        russian:
          updatedWord.russian !== undefined
            ? updatedWord.russian
            : currentWord.russian,
        transcription:
          updatedWord.transcription !== undefined
            ? updatedWord.transcription
            : currentWord.transcription,
        tags:
          updatedWord.tags !== undefined ? updatedWord.tags : currentWord.tags,
        id: updatedWord.id !== undefined ? updatedWord.id : currentWord.id,
        tags_json:
          updatedWord.tags_json !== undefined
            ? updatedWord.tags_json
            : currentWord.tags_json,
      };
      console.log("Sending request to update word:", requestBody);
      const resp = await fetch(`/api/words/${id}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      console.log("Server response:", resp);
      if (!resp.ok) {
        throw new Error(`Failed to update word: ${resp.statusText}`);
      }
      const updatedData = await resp.json();
      console.log("Updated data from server:", updatedData);
      setDataServer((prevData) =>
        prevData.map((word) => (word.id === id ? updatedData : word))
      );
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

  return (
    <WordsContext.Provider value={value}> {children}</WordsContext.Provider>
  );
}
