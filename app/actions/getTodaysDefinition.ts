import { allWords, dateToEntry } from '../utils/helper';

export default async function getTodaysDefinition() {
  try {
    const todaysWord = 'w';
    //  allWords[dateToEntry()];
    const baseURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${todaysWord}`;
    const res = await fetch(baseURL);
    if (!res.ok) {
      return null;
    }
    const wordData = await res.json();
    return wordData;
  } catch (err) {
    console.error(err);
  }
}
