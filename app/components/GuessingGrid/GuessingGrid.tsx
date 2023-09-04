'use client';

import { useCallback, useEffect, useState } from 'react';
import GuessingRow from './GuessingRow';
import getTodaysDefinition from '@/app/actions/getTodaysDefinition';
import { containedInWords } from '@/app/utils/helper';

interface GuessingGridProps {}

const GuessingGrid: React.FC<GuessingGridProps> = ({}) => {
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentRow, setCurrentRow] = useState(0);
  const [guessArray, setGuessArray] = useState<string[]>([...Array(6)]);
  const [randomWord, setRandomWord] = useState('');
  const [randomDefinition, setRandomDefinition] = useState('');
  const [incorrectRow, setIncorrectRow] = useState<number>(-1);
  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (currentRow > 5) {
        return;
      }
      if (e.key === 'Enter') {
        if (!containedInWords(currentGuess)) {
          console.log('Not a valid word');
          if (incorrectRow === -1) {
            setIncorrectRow(currentRow);
            setTimeout(() => {
              setIncorrectRow(-1);
            }, 750);
          }
          return;
        }
        if (currentGuess.length !== 5) {
          // console.log('Not enough');
        } else if (currentRow < 6) {
          let newGuesses = [...guessArray];
          newGuesses[currentRow] = currentGuess;
          setGuessArray(newGuesses);
          setCurrentGuess('');
          setCurrentRow((prev) => prev + 1);
          console.log(newGuesses);
        } else if (currentRow === 6) {
          // console.log('finito');
        }
      } else if (/^[A-Za-z]$/.test(e.key)) {
        if (currentGuess.length < 5) {
          setCurrentGuess((prev) => prev + e.key);
          // console.log(currentGuess, e.key);
        }
      } else if (e.key === 'Backspace') {
        setCurrentGuess((prev) => prev.slice(0, -1));
      }
      // console.log(e.key, currentGuess.length, currentGuess);
    },
    [currentGuess, currentRow, guessArray]
  );

  useEffect(() => {
    getTodaysDefinition().then((word) => {
      console.log(word);
      setRandomDefinition(word[0].meanings[0].definitions[0].definition);
      setRandomWord(word[0].word);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    return () => removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);

  return (
    <>
      <div className="mb-16 flex flex-col justify-center items-center">
        <p>{randomWord}</p>
        <p>{randomDefinition}</p>
      </div>
      <section className="flex justify-center items-center mb-20">
        <div className="grid grid-rows-6 gap-2 ">
          <GuessingRow
            currentRow={currentRow}
            rowNumber={0}
            currentGuess={currentGuess}
            guessArray={guessArray}
            correctWord={randomWord}
            incorrectRow={incorrectRow}
          />
          <GuessingRow
            currentRow={currentRow}
            rowNumber={1}
            currentGuess={currentGuess}
            guessArray={guessArray}
            correctWord={randomWord}
            incorrectRow={incorrectRow}
          />
          <GuessingRow
            currentRow={currentRow}
            rowNumber={2}
            currentGuess={currentGuess}
            guessArray={guessArray}
            correctWord={randomWord}
            incorrectRow={incorrectRow}
          />
          <GuessingRow
            currentRow={currentRow}
            rowNumber={3}
            currentGuess={currentGuess}
            guessArray={guessArray}
            correctWord={randomWord}
            incorrectRow={incorrectRow}
          />
          <GuessingRow
            currentRow={currentRow}
            rowNumber={4}
            currentGuess={currentGuess}
            guessArray={guessArray}
            correctWord={randomWord}
            incorrectRow={incorrectRow}
          />
          <GuessingRow
            currentRow={currentRow}
            rowNumber={5}
            currentGuess={currentGuess}
            guessArray={guessArray}
            correctWord={randomWord}
            incorrectRow={incorrectRow}
          />
        </div>
      </section>
    </>
  );
};

export default GuessingGrid;
