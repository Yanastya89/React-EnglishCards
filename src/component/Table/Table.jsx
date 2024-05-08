import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../Context/MyContext";
import style from "./table.module.scss";

function Table({ deleteWords }) {
  const { dataServer } = useContext(MyContext);
  const [editMode, setEditMode] = useState(false);
  const [editedFields, setEditedFields] = useState({});
  const [hasEmptyField, setHasEmptyField] = useState(false);

  useEffect(() => {
    const isEmpty = Object.values(editedFields).some(
      (val) => typeof val === "string" && val.trim() === ""
    );
    setHasEmptyField(isEmpty);
  }, [editedFields]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const validateFields = (fields) => {
    return Object.values(fields).some(
      (val) => typeof val === "string" && val.trim() !== ""
    );
  };

  const handleSave = () => {
    const isValid = validateFields(editedFields);
    if (isValid) {
      console.log("Форма сохранена:", editedFields);
      setEditMode(false);
    } else {
      console.log("Произошла ошибка. Заполните все поля перед сохранением.");
    }
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleDelete = (id) => {
    deleteWords(id);
  };

  const handleInputChange = (item, field, value) => {
    const lowercasedValue = value.toLowerCase();
    if (/\d/.test(lowercasedValue)) {
      console.log("Строка не должна содержать цифр");
      return;
    }
    setEditedFields((prevFields) => {
      const updatedFields = {
        ...prevFields,
        [item.id]: { ...prevFields[item.id], [field]: value },
      };
      const isEmpty = Object.values(updatedFields).some(
        (field) => typeof field === "string" && field.trim() === ""
      );
      setHasEmptyField(isEmpty);
      return updatedFields;
    });
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
                    onClick={handleSave}
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

export default Table;
