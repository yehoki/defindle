export default async function getWord(word: string) {
  try {
    const baseURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
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
