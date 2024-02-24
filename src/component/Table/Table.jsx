import React, { useState } from "react";
import wordsData from "../../data/wordlist.json";
import style from "./table.module.scss";

export default function Table() {
  const [editMode, setEditMode] = useState(false);
  /*  editMode - это переменная состояния, которая будет хранить текущий режим редактирования (true/false).
  setEditMode - это функция, которая позволяет изменять значение editMode.
 */
  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  return (
    <>
      <table className={style.tableWrapper}>
        <thead>
          <tr className={style.tableThead}>
            <th>english</th>
            <th>transcription</th>
            <th>russian</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {wordsData.words.map((word) => (
            <tr key={word.id}>
              <td>
                {editMode ? (
                  <input type="text" defaultValue={word.english} />
                ) : (
                  word.english
                )}
              </td>
              <td>
                {editMode ? (
                  <input type="text" defaultValue={word.transcription} />
                ) : (
                  word.transcription
                )}
              </td>
              <td>
                {editMode ? (
                  <input type="text" defaultValue={word.russian} />
                ) : (
                  word.russian
                )}
              </td>

              <td>
                {editMode ? (
                  <>
                    <button
                      className={`${style.saveButton} ${style.btn}`}
                      onClick={handleSave}
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
                    ></button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
