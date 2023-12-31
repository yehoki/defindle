'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
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

type LocalStorageGameStore = {
  id: number;
  board: [string, string, string, string, string, string];
  currentRow: number;
  status: GameStatus;
};

type LocalStorageStatStore = {
  currentStreak: number;
  maxStreak: number;
  guessDistribution: GuessDistribution;
  winPercentage: number;
  gamesPlayed: number;
  gamesWon: number;
  averageGuesses: number;
  hasPlayed: boolean;
};

type LocalStorageStore = {
  game: LocalStorageGameStore;
  stats: LocalStorageStatStore;
};

const GuessingGrid: React.FC<GuessingGridProps> = ({ todaysWord }) => {
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentRow, setCurrentRow] = useState(0);
  const [guessArray, setGuessArray] = useState<string[]>([
    '',
    '',
    '',
    '',
    '',
    '',
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
          currentRow: guessIndex + 1,
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

    // updateWin(guessRow: 1 | 2 | 3 | 4 | 5 | 6) {
    //   if (this.data) {
    //     const guessRowString =
    //     const updatedData:LocalStorageStatStore = {
    //       currentStreak: this.data.stats.currentStreak + 1,
    //       maxStreak: Math.max(this.data.stats.maxStreak, this.data.stats.currentStreak + 1),
    //       guessDistribution: {
    //         ...this.data.stats.guessDistribution,
    //         guessRowString:
    //       }
    //     }
    //   }
    // }
    // TODO
    // Adding stat counting
    // Adding stat updating
    // Adding stat initialize -- DONE
  }

  useLayoutEffect(() => {
    const guessData = new LocalStorageData();
    const todaysGuesses = guessData.data;
    if (todaysGuesses) {
      setCurrentRow(todaysGuesses.game.currentRow);
      setGuessArray(todaysGuesses.game.board);
      if (todaysGuesses.game.status === GameStatus.WIN) {
        handleWin(todaysGuesses.game.board.indexOf(todaysWord.word));
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
      const localStorageData = new LocalStorageData();
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
          localStorageData.handleWin(currentGuess.toLowerCase(), currentRow);
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
          // storageGuesses.setStorageGuesses(newGuesses);
          localStorageData.handleNewGuess(
            currentGuess.toLowerCase(),
            currentRow
          );
          setCurrentRow((prev) => prev + 1);
          setCurrentGuess('');
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
      handleWin,
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
