'use client';

import { useCallback, useEffect, useState } from 'react';
import GuessingRow from './GuessingRow';
import { allWords } from '@/app/utils/helper';

interface GuessingGridProps {}

const GuessingGrid: React.FC<GuessingGridProps> = ({}) => {
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentRow, setCurrentRow] = useState(0);
  const [guessArray, setGuessArray] = useState<string[]>([...Array(6)]);
  const [randomWord, setRandomWord] = useState('');

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (currentRow > 5) {
        return;
      }
      if (e.key === 'Enter') {
        if (currentGuess.length !== 5) {
          console.log('Not enough');
        } else if (currentRow < 6) {
          let newGuesses = [...guessArray];
          newGuesses[currentRow] = currentGuess;
          setGuessArray(newGuesses);
          setCurrentGuess('');
          setCurrentRow((prev) => prev + 1);
        } else if (currentRow === 6) {
          console.log('finito');
        }
      } else if (/^[A-Za-z]$/.test(e.key)) {
        if (currentGuess.length < 5) {
          setCurrentGuess((prev) => prev + e.key);
          console.log(currentGuess, e.key);
        }
      } else if (e.key === 'Backspace') {
        setCurrentGuess((prev) => prev.slice(0, -1));
      }
      console.log(e.key, currentGuess.length, currentGuess);
    },
    [currentGuess, currentRow, guessArray]
  );

  useEffect(() => {
    setRandomWord(allWords[Math.floor(Math.random() * allWords.length)]);
    window.addEventListener('keyup', handleKeyUp);

    return () => removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);

  return (
    <section className="grid grid-rows-6 gap-2">
      {randomWord}
      <GuessingRow
        currentRow={currentRow}
        rowNumber={0}
        currentGuess={currentGuess}
        guessArray={guessArray}
      />
      <GuessingRow
        currentRow={currentRow}
        rowNumber={1}
        currentGuess={currentGuess}
        guessArray={guessArray}
      />
      <GuessingRow
        currentRow={currentRow}
        rowNumber={2}
        currentGuess={currentGuess}
        guessArray={guessArray}
      />
      <GuessingRow
        currentRow={currentRow}
        rowNumber={3}
        currentGuess={currentGuess}
        guessArray={guessArray}
      />
      <GuessingRow
        currentRow={currentRow}
        rowNumber={4}
        currentGuess={currentGuess}
        guessArray={guessArray}
      />
      <GuessingRow
        currentRow={currentRow}
        rowNumber={5}
        currentGuess={currentGuess}
        guessArray={guessArray}
      />
    </section>
  );
};

export default GuessingGrid;
