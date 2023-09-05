'use client';

import { useCallback, useEffect, useState } from 'react';
import GuessingRow from './GuessingRow';
import getTodaysDefinition from '@/app/actions/getTodaysDefinition';
import { containedInWords } from '@/app/utils/helper';

interface GuessingGridProps {
  todaysWord: any;
}

const GuessingGrid: React.FC<GuessingGridProps> = ({ todaysWord }) => {
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentRow, setCurrentRow] = useState(0);
  const [guessArray, setGuessArray] = useState<string[]>([...Array(6)]);
  const [randomWord, setRandomWord] = useState(todaysWord[0].word);
  const [randomDefinition, setRandomDefinition] = useState(
    todaysWord[0].meanings[0].definitions[0].definition
  );
  const [incorrectRow, setIncorrectRow] = useState(-1);
  const [winningRow, setWinningRow] = useState(-1);
  const [awaiting, setAwaiting] = useState(false);

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (currentRow > 5 || winningRow !== -1 || awaiting) {
        return;
      }
      if (e.key === 'Enter') {
        setAwaiting(true);
        if (currentGuess.toLowerCase() === randomWord.toLowerCase()) {
          let newGuesses = [...guessArray];
          newGuesses[currentRow] = currentGuess.toLowerCase();
          setGuessArray(newGuesses);
          setCurrentGuess('');
          setCurrentRow(-1);
          setTimeout(() => {
            setWinningRow(currentRow);
          }, 3000);
          return;
        } else if (currentGuess.length !== 5) {
        } else if (
          !containedInWords(currentGuess) ||
          guessArray.includes(currentGuess.toLowerCase())
        ) {
          if (incorrectRow === -1) {
            setIncorrectRow(currentRow);
            setTimeout(() => {
              setIncorrectRow(-1);
              setAwaiting(false);
            }, 750);
          }
          return;
        } else if (currentRow < 6) {
          let newGuesses = [...guessArray];
          newGuesses[currentRow] = currentGuess.toLowerCase();
          setGuessArray(newGuesses);
          setCurrentGuess('');
          setCurrentRow((prev) => prev + 1);
        }
        setAwaiting(false);
      } else if (/^[A-Za-z]$/.test(e.key)) {
        if (currentGuess.length < 5) {
          setCurrentGuess((prev) => prev + e.key);
        }
      } else if (e.key === 'Backspace') {
        setCurrentGuess((prev) => prev.slice(0, -1));
      }
    },
    [
      currentGuess,
      currentRow,
      guessArray,
      incorrectRow,
      randomWord,
      awaiting,
      winningRow,
    ]
  );

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    return () => removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);

  return (
    <>
      <div className="mb-16 mt-8 flex flex-col justify-center items-center">
        <p
          className="
        text-center
        text-lg md:text-xl"
        >
          {randomDefinition}
        </p>
      </div>
      <section className="flex justify-center items-center mb-20">
        <div className="grid grid-rows-6 gap-1 md:gap-2 ">
          <GuessingRow
            currentRow={currentRow}
            rowNumber={0}
            currentGuess={currentGuess}
            guessArray={guessArray}
            correctWord={randomWord}
            incorrectRow={incorrectRow}
            winningRow={winningRow}
          />
          <GuessingRow
            currentRow={currentRow}
            rowNumber={1}
            currentGuess={currentGuess}
            guessArray={guessArray}
            correctWord={randomWord}
            incorrectRow={incorrectRow}
            winningRow={winningRow}
          />
          <GuessingRow
            currentRow={currentRow}
            rowNumber={2}
            currentGuess={currentGuess}
            guessArray={guessArray}
            correctWord={randomWord}
            incorrectRow={incorrectRow}
            winningRow={winningRow}
          />
          <GuessingRow
            currentRow={currentRow}
            rowNumber={3}
            currentGuess={currentGuess}
            guessArray={guessArray}
            correctWord={randomWord}
            incorrectRow={incorrectRow}
            winningRow={winningRow}
          />
          <GuessingRow
            currentRow={currentRow}
            rowNumber={4}
            currentGuess={currentGuess}
            guessArray={guessArray}
            correctWord={randomWord}
            incorrectRow={incorrectRow}
            winningRow={winningRow}
          />
          <GuessingRow
            currentRow={currentRow}
            rowNumber={5}
            currentGuess={currentGuess}
            guessArray={guessArray}
            correctWord={randomWord}
            incorrectRow={incorrectRow}
            winningRow={winningRow}
          />
        </div>
      </section>
    </>
  );
};

export default GuessingGrid;
