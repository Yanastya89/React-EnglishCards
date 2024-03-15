import React, { useState } from "react";
import wordsData from "../../data/wordlist.json";

import Table from "../../component/Table/Table";

export default function Main() {
  const [stWords, setStWords] = useState(wordsData);

  function handleDelete(id) {
    const newStWords = stWords.filter((item) => item.id !== id);
    setStWords(newStWords);
  }
  return (
    <div>
      <Table stWords={stWords} deleteWords={handleDelete} />
    </div>
  );
}
