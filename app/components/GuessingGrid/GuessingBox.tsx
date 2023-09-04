'use client';

import { useCallback } from 'react';

interface GuessingBoxProps {
  currentGuess: string;
  guessCol: number;
  isGuessing: boolean;
  rowGuess: string;
}

const GuessingBox: React.FC<GuessingBoxProps> = ({
  currentGuess,
  guessCol,
  isGuessing,
  rowGuess,
}) => {
  const extractString = useCallback(() => {
    if (currentGuess.length > guessCol) {
      return currentGuess[guessCol];
    } else {
      return '';
    }
  }, [currentGuess, guessCol]);

  return (
    <>
      <div
        className="h-16 w-16 border border-neutral-500
  flex justify-center items-center font-bold uppercase
  text-3xl
  "
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
