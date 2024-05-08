
const GetWordsService = {
  async getWords() {
  const resp = await fetch("http://itgirlschool.justmakeit.ru/api/words")
if (!resp.ok){
  throw new Error(`Failed to fetch words: ${resp.statusText}`);
}
const data = await resp.json();
return data;
  },
};

export default GetWordsService
