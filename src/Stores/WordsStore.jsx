import { action, observable, runInAction, makeObservable } from "mobx";
import GetWordsService from "../Services/GetWordsService";

class WordsStore {
  dataServer = [];
  loading = true;

  constructor() {
    makeObservable(this, {
      dataServer: observable,
      loading: observable,
      fetchData: action.bound,
      addWord: action.bound,
      deleteWord: action.bound,
      updateWord: action.bound,
    });
    this.fetchData();
  }

  async fetchData() {
    try {
      const wordsServer = await GetWordsService.getWords();
      runInAction(() => {
        this.dataServer = wordsServer;
        this.loading = false;
      });
    } catch (error) {
      console.error("Error fetching words:", error);
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async makeRequest(url, method, body) {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const resp = await fetch(url, options);
    if (!resp.ok) {
      throw new Error(
        `Failed to ${method.toLowerCase()} word: ${resp.statusText}`
      );
    }
    return resp.json();
  }

  async addWord(newWord) {
    try {
      const addedWord = await this.makeRequest(
        "/api/words/add",
        "POST",
        newWord
      );
      runInAction(() => {
        this.dataServer.push(addedWord);
      });
    } catch (error) {
      console.error("Error adding word:", error);
    }
  }

  async deleteWord(id) {
    try {
      await this.makeRequest(`/api/words/${id}/delete`, "POST");
      runInAction(() => {
        this.dataServer = this.dataServer.filter((word) => word.id !== id);
      });
    } catch (error) {
      console.error("Error deleting word:", error);
    }
  }

  buildUpdatedRequestBody(currentWord, updatedWord) {
    return {
      ...currentWord,
      ...updatedWord,
    };
  }
  async updateWord(id, updatedWord) {
    try {
      const currentWord = this.dataServer.find((word) => word.id === id);
      if (!currentWord) {
        throw new Error(`Word with id ${id} not found`);
      }
      const requestBody = this.buildUpdatedRequestBody(
        currentWord,
        updatedWord
      );
      const updatedData = await this.makeRequest(
        `/api/words/${id}/update`,
        "POST",
        requestBody
      );

      runInAction(() => {
        this.dataServer = this.dataServer.map((word) =>
          word.id === id ? updatedData : word
        );
      });
    } catch (error) {
      console.error("Error updating word:", error);
    }
  }
}

const wordsStore = new WordsStore();
export { WordsStore, wordsStore };
