'use client';

import { useCallback, useMemo } from 'react';

interface GuessingBoxProps {
  currentGuess: string;
  guessCol: number;
  isGuessing: boolean;
  rowGuess: string;
  correctWord: string;
}

const GuessingBox: React.FC<GuessingBoxProps> = ({
  currentGuess,
  guessCol,
  isGuessing,
  rowGuess,
  correctWord,
}) => {
  const extractString = useCallback(() => {
    if (currentGuess.length > guessCol) {
      return currentGuess[guessCol];
    } else {
      return '';
    }
  }, [currentGuess, guessCol]);

  const colorDecider = useMemo(() => {
    if (!isGuessing && rowGuess !== undefined) {
      if (rowGuess[guessCol] === correctWord[guessCol]) {
        return 'bg-correct';
      } else if (correctWord.includes(rowGuess[guessCol])) {
        return 'bg-close';
      } else {
        return '';
      }
    }
    return '';
  }, [correctWord, guessCol, rowGuess, isGuessing]);

  return (
    <>
      <div
        className={`h-16 w-16 border border-neutral-500
  flex justify-center items-center font-bold uppercase
  text-3xl
  ${colorDecider}
  `}
      >
        {isGuessing
          ? extractString()
          : rowGuess === undefined
          ? ''
          : rowGuess[guessCol]}
      </div>
    </>
  );
};

export default GuessingBox;
