'use client';

import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import GuessingRow from './GuessingRow';
import { containedInWords, dateToEntry } from '@/app/utils/helper';
import { DictionaryModel } from '@/app/types/FetchTypes';

interface GuessingGridProps {
  todaysWord: {
    data: DictionaryModel[];
    word: string;
  };
}

type GuessArray = (string | undefined)[];

enum GameStatus {
  'WIN',
  'IN_PROGRESS',
  'LOSE',
}

type GuessDistribution = {
  '1': number;
  '2': number;
  '3': number;
  '4': number;
  '5': number;
  '6': number;
  fail: number;
};

type LocalStorageStore = {
  game: {
    id: number;
    board: [string, string, string, string, string, string];
    currentRow: number;
    status: GameStatus;
  };
  stats: {
    currentStreak: number;
    maxStreak: number;
    guessDistribution: GuessDistribution;
    winPercentage: number;
    gamesPlayed: number;
    gamesWon: number;
    averageGuesses: number;
    hasPlayed: boolean;
  };
};

const GuessingGrid: React.FC<GuessingGridProps> = ({ todaysWord }) => {
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentRow, setCurrentRow] = useState(0);
  const [guessArray, setGuessArray] = useState<(string | undefined)[]>([
    ...Array(6),
  ]);
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

  class LocalStorageData {
    data: LocalStorageStore | undefined;

    constructor() {
      this.initializeStore();
    }

    private initializeEmptyStore() {
      const todaysDate = new Date();
      const todaysEntry = dateToEntry(
        todaysDate.getDate(),
        todaysDate.getMonth(),
        todaysDate.getFullYear()
      );
      const emptyStore: LocalStorageStore = {
        game: {
          id: todaysEntry,
          board: ['', '', '', '', '', ''],
          currentRow: 0,
          status: GameStatus.IN_PROGRESS,
        },
        stats: {
          currentStreak: 0,
          maxStreak: 0,
          guessDistribution: {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
            '6': 0,
            fail: 0,
          },
          winPercentage: 0,
          gamesPlayed: 0,
          gamesWon: 0,
          averageGuesses: 0,
          hasPlayed: false,
        },
      };
      return emptyStore;
    }

    private initializeStore() {
      const answerData = localStorage.getItem('answer-data');
      const todaysDate = new Date();
      const todaysEntry = dateToEntry(
        todaysDate.getDate(),
        todaysDate.getMonth(),
        todaysDate.getFullYear()
      );
      if (answerData) {
        const parsedData: LocalStorageStore = JSON.parse(answerData);
        if (parsedData.game.id === todaysEntry) {
          this.data = parsedData;
        } else {
          this.data = this.initializeEmptyStore();
        }
      } else {
        this.data = this.initializeEmptyStore();
      }
    }

    private updateLocalStore() {
      localStorage.setItem(
        'answer-data',
        this.data ? JSON.stringify(this.data) : ''
      );
    }

    handleNewGuess(guess: string, guessIndex: number) {
      if (this.data && guessIndex < 6) {
        const newBoard = this.data.game.board;
        newBoard[guessIndex] = guess;
        this.data.game = {
          ...this.data.game,
          board: newBoard,
          currentRow: guessIndex,
        };
        this.updateLocalStore();
      }
    }

    handleWin(guess: string, guessIndex: number) {
      if (this.data && guessIndex < 6) {
        const newBoard = this.data.game.board;
        newBoard[guessIndex] = guess;
        this.data.game = {
          ...this.data.game,
          board: newBoard,
          currentRow: guessIndex,
          status: GameStatus.WIN,
        };
        this.updateLocalStore();
      }
    }

    handleLoss(guess: string, guessIndex: number) {
      if (this.data && guessIndex === 5) {
        const newBoard = this.data.game.board;
        newBoard[guessIndex] = guess;
        this.data.game = {
          ...this.data.game,
          board: newBoard,
          currentRow: guessIndex,
          status: GameStatus.LOSE,
        };
        this.updateLocalStore();
      }
    }
  }

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
    const guessData = new LocalStorageData();
    const guesses = new LocalStorageGuesses();
    const localGuesses = guesses.getGuessArray();
    const todaysGuesses = guessData.data;
    if (localGuesses) {
      const entries = localGuesses.filter((guess) => typeof guess === 'string');
      if (entries.length > 0) {
        setCurrentRow(entries.length);
        setGuessArray(localGuesses);
        if (entries.includes(todaysWord.word)) {
          handleWin(entries.indexOf(todaysWord.word));
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
        if (currentGuess.toLowerCase() === todaysWord.word.toLowerCase()) {
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
      todaysWord.word,
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
            correctWord={todaysWord.word}
            incorrectRow={incorrectRow}
            winningRow={winningRow}
          />
          <GuessingRow
            currentRow={currentRow}
            rowNumber={1}
            currentGuess={currentGuess}
            guessArray={guessArray}
            correctWord={todaysWord.word}
            incorrectRow={incorrectRow}
            winningRow={winningRow}
          />
          <GuessingRow
            currentRow={currentRow}
            rowNumber={2}
            currentGuess={currentGuess}
            guessArray={guessArray}
            correctWord={todaysWord.word}
            incorrectRow={incorrectRow}
            winningRow={winningRow}
          />
          <GuessingRow
            currentRow={currentRow}
            rowNumber={3}
            currentGuess={currentGuess}
            guessArray={guessArray}
            correctWord={todaysWord.word}
            incorrectRow={incorrectRow}
            winningRow={winningRow}
          />
          <GuessingRow
            currentRow={currentRow}
            rowNumber={4}
            currentGuess={currentGuess}
            guessArray={guessArray}
            correctWord={todaysWord.word}
            incorrectRow={incorrectRow}
            winningRow={winningRow}
          />
          <GuessingRow
            currentRow={currentRow}
            rowNumber={5}
            currentGuess={currentGuess}
            guessArray={guessArray}
            correctWord={todaysWord.word}
            incorrectRow={incorrectRow}
            winningRow={winningRow}
          />
        </div>
      </section>
    </>
  );
};

export default GuessingGrid;
