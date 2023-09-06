import { DictionaryModel } from '../types/FetchTypes';
import { allWords, dateToEntry } from '../utils/helper';
const API_KEY = process.env.NEXT_PUBLIC_DICT_API_KEY;

export default async function getTodaysDefinition() {
  try {
    const todaysDate = new Date();
    const todaysEntry = dateToEntry(
      todaysDate.getDate(),
      todaysDate.getMonth(),
      todaysDate.getFullYear()
    );
    const todaysWord = allWords[todaysEntry];

    const baseDictionaryURL = `https://dictionaryapi.com/api/v3/references/collegiate/json/${todaysWord}?key=${API_KEY}`;
    const res = await fetch(baseDictionaryURL);
    if (!res.ok) {
      return null;
    }
    const wordData: DictionaryModel[] = await res.json();
    return {
      data: wordData,
      word: todaysWord,
    };
  } catch (err) {
    console.error(err);
    return null
  }
}
