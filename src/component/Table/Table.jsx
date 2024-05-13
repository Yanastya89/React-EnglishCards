import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../Context/MyContext";
import GetWordsService from "../../Services/GetWordsService";
import style from "./table.module.scss";

function Table() {
  const { dataServer, setDataServer, addWord, deleteWord, updateWord } =
    useContext(MyContext);
  const [editMode, setEditMode] = useState(false);
  const [editedFields, setEditedFields] = useState({});
  const [hasEmptyField, setHasEmptyField] = useState(false);
  const [newWord, setNewWord] = useState({
    english: "",
    transcription: "",
    russian: "",
    tags: "",
    id: "",
    tags_json: "",
  });

  const fetchDataFromServer = async () => {
    try {
      const words = await GetWordsService.getWords();
      setDataServer(words);
    } catch (error) {
      console.error("Ошибка при получении данных с сервера:", error);
    }
  };

  const handleAddWord = async () => {
    try {
      await addWord(newWord);
      await fetchDataFromServer();

      setNewWord({
        english: "",
        transcription: "",
        russian: "",
        tags: "",
        id: "",
        tags_json: "",
      });
      setEditMode(false);

      console.log("Слово успешно добавлено");
    } catch (error) {
      console.error("Ошибка при добавлении слова:", error);
    }
  };

  const handleDeleteWord = async (id) => {
    try {
      await deleteWord(id);
      await fetchDataFromServer();
    } catch (error) {
      console.error(`Failed to delete word with ID ${id}:`, error);
    }
  };

  const handleUpdateWord = async (id, updatedFields) => {
    try {
      await updateWord(id, updatedFields);
      console.log("Слово успешно обновлено");
    } catch (error) {
      console.error(`Ошибка при обновлении слова с ID ${id}:`, error);
    }
  };

  useEffect(() => {
    const isEmpty = Object.values(newWord).some(
      (val) => typeof val === "string" && val.trim() === ""
    );
    setHasEmptyField(isEmpty);
  }, [newWord]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const validateFields = (fields) => {
    if (!fields || typeof fields !== "object") {
      return false;
    }
    const fieldValues = Object.values(fields);
    if (!Array.isArray(fieldValues)) {
      return false;
    }
    return fieldValues.every((value) => value !== null && value !== undefined);
  };
  const handleSave = async () => {
    try {
      const isValid = validateFields(editedFields);
      if (isValid) {
        const idsToUpdate = Object.keys(editedFields);
        await Promise.all(
          idsToUpdate.map(async (id) => {
            const updatedFields = editedFields[id];
            await handleUpdateWord(id, updatedFields);
          })
        );
        setEditMode(false);
      } else {
        console.log("Произошла ошибка. Заполните все поля перед сохранением.");
      }
    } catch (error) {
      console.error("Ошибка при сохранении слова:", error);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleInputChange = (item, field, value) => {
    const lowercasedValue = value.toLowerCase();
    if (/\d/.test(lowercasedValue)) {
      console.log("Строка не должна содержать цифр");
      return;
    }

    const updatedFields = {
      ...editedFields,
      [item.id]: {
        ...editedFields[item.id],
        [field]: value,
      },
    };

    setEditedFields(updatedFields);

    const isEmpty = Object.values(updatedFields).some(
      (field) => typeof field === "string" && field.trim() === ""
    );

    setHasEmptyField(isEmpty);
  };

  return (
    <table className={style.tableWrapper}>
      <thead>
        <tr className={style.tableThead}>
          <th>english</th>
          <th>transcription</th>
          <th>russian</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {dataServer.map((item) => (
          <tr key={item.id}>
            <td>
              {editMode ? (
                <input
                  className={`${style.inputField} ${
                    editedFields[item.id]?.english !== undefined &&
                    editedFields[item.id].english.trim() === ""
                      ? style.emptyField
                      : ""
                  }`}
                  type="text"
                  name="englishInput"
                  value={
                    editedFields[item.id]?.english !== undefined
                      ? editedFields[item.id].english
                      : item.english
                  }
                  onChange={(e) =>
                    handleInputChange(item, "english", e.target.value)
                  }
                />
              ) : (
                item.english
              )}
            </td>
            <td>
              {editMode ? (
                <input
                  className={`${style.inputField} ${
                    editedFields[item.id]?.transcription !== undefined &&
                    editedFields[item.id].transcription.trim() === ""
                      ? style.emptyField
                      : ""
                  }`}
                  type="text"
                  name="transcriptionInput"
                  value={
                    editedFields[item.id]?.transcription !== undefined
                      ? editedFields[item.id].transcription
                      : item.transcription
                  }
                  onChange={(e) =>
                    handleInputChange(item, "transcription", e.target.value)
                  }
                />
              ) : (
                item.transcription
              )}
            </td>
            <td>
              {editMode ? (
                <input
                  className={`${style.inputField} ${
                    editedFields[item.id]?.russian !== undefined &&
                    editedFields[item.id].russian.trim() === ""
                      ? style.emptyField
                      : ""
                  }`}
                  type="text"
                  name="russianInput"
                  value={
                    editedFields[item.id]?.russian !== undefined
                      ? editedFields[item.id].russian
                      : item.russian
                  }
                  onChange={(e) =>
                    handleInputChange(item, "russian", e.target.value)
                  }
                />
              ) : (
                item.russian
              )}
            </td>
            <td>
              {editMode ? (
                <>
                  <button
                    className={`${style.saveButton} ${style.btn}`}
                    onClick={() => handleSave(item.id)}
                    disabled={hasEmptyField}
                  ></button>
                  <button
                    className={`${style.cancelButton} ${style.btn}`}
                    onClick={handleCancel}
                  ></button>
                </>
              ) : (
                <>
                  <button
                    className={`${style.editButton} ${style.btn}`}
                    onClick={handleEdit}
                  ></button>
                  <button
                    className={`${style.deleteButton} ${style.btn}`}
                    onClick={() => handleDeleteWord(item.id)}
                  ></button>
                </>
              )}
            </td>
          </tr>
        ))}
        <tr>
          <td>
            <input
              type="text"
              name="englishInput"
              value={newWord.english}
              onChange={(e) =>
                setNewWord({ ...newWord, english: e.target.value })
              }
            />
          </td>
          <td>
            <input
              type="text"
              name="transcriptionInput"
              value={newWord.transcription}
              onChange={(e) =>
                setNewWord({ ...newWord, transcription: e.target.value })
              }
            />
          </td>
          <td>
            <input
              type="text"
              name="russianInput"
              value={newWord.russian}
              onChange={(e) =>
                setNewWord({ ...newWord, russian: e.target.value })
              }
            />
          </td>
          <td>
            <button onClick={handleAddWord} className={style.addWordButton}>
              Add word
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
