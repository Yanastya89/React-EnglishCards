import React, { useState } from "react";
import style from "./table.module.scss";

export default function Table({ stWords, deleteWords }) {
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleDelete = (id) => {
    deleteWords(id);
  };

  return (
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
        {stWords.map((item) => (
          <tr key={item.id}>
            <td>
              {editMode ? (
                <input type="text" value={item.english} />
              ) : (
                item.english
              )}
            </td>
            <td>
              {editMode ? (
                <input type="text" value={item.transcription} />
              ) : (
                item.transcription
              )}
            </td>
            <td>
              {editMode ? (
                <input type="text" value={item.russian} />
              ) : (
                item.russian
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
                    onClick={() => handleDelete(item.id)}
                  ></button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
