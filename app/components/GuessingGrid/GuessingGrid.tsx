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
  const [incorrectRow, setIncorrectRow] = useState(-1);
  const [winningRow, setWinningRow] = useState(-1);
  const [awaiting, setAwaiting] = useState(false);
  // const handleGuess = useCallback(() => {

  // }, [])
  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (currentRow > 5 || winningRow !== -1 || awaiting) {
        return;
      }
      // setAwaiting(true);
      if (e.key === 'Enter') {
        if (currentGuess.toLowerCase() === randomWord.toLowerCase()) {
          let newGuesses = [...guessArray];
          newGuesses[currentRow] = currentGuess;
          setGuessArray(newGuesses);
          setCurrentGuess('');
          setCurrentRow(-1);
          // console.log('Correct!');
          setTimeout(() => {
            setWinningRow(currentRow);
          }, 3000);
          return;
        }
        if (!containedInWords(currentGuess)) {
          console.log('Not a valid word');
          if (incorrectRow === -1) {
            setIncorrectRow(currentRow);
            setTimeout(() => {
              setIncorrectRow(-1);
              setAwaiting(false);
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
      setAwaiting(false);
      // console.log(e.key, currentGuess.length, currentGuess);
    },
    [currentGuess, currentRow, guessArray, incorrectRow, randomWord]
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
      <div className="mb-16 mt-8 flex flex-col justify-center items-center">
        {/* <p>{randomWord}</p> */}
        <p className="text-lg md:text-xl">{randomDefinition}</p>
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
