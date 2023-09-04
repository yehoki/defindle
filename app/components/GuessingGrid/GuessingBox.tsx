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

  const transitionDelay = (2 * guessCol + 1) * 250;
  const animationDelay = guessCol * 500;
  return (
    <>
      <div
        style={{
          transitionDelay: `${transitionDelay}ms`,
          animationDelay: `${animationDelay}ms`,
        }}
        className={`
        min-w-[40px] min-h-[40px]
        w-10 h-10
        md:min-w-[64px] md:min-h-[64px]
        md:w-16 md:h-16
        text-xl md:text-3xl
        border border-neutral-500
  flex justify-center items-center font-bold uppercase
  transition duration-100
  ${colorDecider}
  ${!isGuessing && rowGuess !== undefined && 'animate-flip'}
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
