'use client';

import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import GuessingRow from './GuessingRow';
import { containedInWords } from '@/app/utils/helper';
import { DictionaryModel } from '@/app/types/FetchTypes';

interface GuessingGridProps {
  todaysWord: {
    data: DictionaryModel[];
    word: string;
  };
}

type GuessArray = (string | undefined)[];

const GuessingGrid: React.FC<GuessingGridProps> = ({ todaysWord }) => {
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentRow, setCurrentRow] = useState(0);
  const [guessArray, setGuessArray] = useState<(string | undefined)[]>([
    ...Array(6),
  ]);
  const [randomWord, setRandomWord] = useState(todaysWord.word);
  const [randomDefinition, setRandomDefinition] = useState(
    todaysWord.data[0].shortdef[0]
  );
  const [incorrectRow, setIncorrectRow] = useState(-1);
  const [winningRow, setWinningRow] = useState(-1);
  const [awaiting, setAwaiting] = useState(false);

  const updateStorageGuesses = useCallback(
    (guesses: (string | undefined)[]) => {
      localStorage.setItem('local-guesses', JSON.stringify(guesses));
    },
    []
  );

  class LocalStorageGuesses {
    todaysGuesses: (string | undefined)[] = [];
    dateToday: string = new Date().toLocaleDateString('en-GB');

    constructor() {
      this.setTodaysGuesses();
    }

    getGuessArray() {
      return this.todaysGuesses;
    }

    private setTodaysGuesses() {
      const localGuesses = localStorage.getItem(this.dateToday);
      if (localGuesses) {
        const parsedGuesses = [...JSON.parse(localGuesses)].map((guess) => {
          if (typeof guess === 'string') {
            return guess;
          } else {
            return undefined;
          }
        });
        const entries = parsedGuesses.filter(
          (guess) => typeof guess === 'string'
        );
        this.todaysGuesses = parsedGuesses;
      }
    }

    setStorageGuesses(guessArray: GuessArray) {
      localStorage.setItem(this.dateToday, JSON.stringify(guessArray));
    }

    // todaysGuesses(): string {
    //   const today = new Date();
    //   const formattedDate = today.toLocaleDateString('en-GB');
    //   const todaysGuesses = localStorage.getItem(formattedDate)
    //   return todaysGuesses
    // }
  }

  useLayoutEffect(() => {
    const guesses = new LocalStorageGuesses();
    const localGuesses = guesses.getGuessArray();
    if (localGuesses) {
      const entries = localGuesses.filter((guess) => typeof guess === 'string');
      if (entries.length > 0) {
        setCurrentRow(entries.length);
        setGuessArray(localGuesses);
        if (entries.includes(randomWord)) {
          handleWin(entries.indexOf(randomWord));
        }
      }
    }
  }, []);

  const handleWin = useCallback(
    (victoriousRow = currentRow) => {
      setCurrentGuess('');
      setCurrentRow(-1);
      setTimeout(() => {
        setWinningRow(victoriousRow);
      }, 3000);
    },
    [currentRow]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      const storageGuesses = new LocalStorageGuesses();
      if (
        currentRow > 5 ||
        winningRow !== -1 ||
        awaiting ||
        e.key === 'Meta' ||
        e.key === 'Alt' ||
        e.key === 'Shift' ||
        e.key === 'Control'
      ) {
        return;
      }
      if (e.key === 'Enter') {
        setAwaiting(true);
        if (currentGuess.toLowerCase() === randomWord.toLowerCase()) {
          let newGuesses = [...guessArray];
          newGuesses[currentRow] = currentGuess.toLowerCase();
          setGuessArray(newGuesses);
          storageGuesses.setStorageGuesses(newGuesses);
          handleWin();
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
          storageGuesses.setStorageGuesses(newGuesses);
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
        text-lg md:text-xl "
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
