'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

interface GuessingBoxProps {
  currentGuess: string;
  guessCol: number;
  isGuessing: boolean;
  rowGuess: string;
  correctWord: string;
  hasWon: boolean;
}

const GuessingBox: React.FC<GuessingBoxProps> = ({
  currentGuess,
  guessCol,
  isGuessing,
  rowGuess,
  correctWord,
  hasWon,
}) => {
  const [currentAnimation, setCurrentAnimation] = useState('');
  const [currentAnimationDelay, setCurrentAnimationDelay] = useState(0);
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
        return 'bg-[#3a3a3c]';
      }
    }
    return '';
  }, [correctWord, guessCol, rowGuess, isGuessing]);

  const transitionDelay = (2 * guessCol + 1) * 250;

  useEffect(() => {
    if (hasWon) {
      setCurrentAnimation('animate-winning');
      setCurrentAnimationDelay(100 * guessCol);
    } else if (!isGuessing && rowGuess !== undefined) {
      setCurrentAnimation('animate-flip');
      setCurrentAnimationDelay(guessCol * 500);
    }
  }, [hasWon, isGuessing, rowGuess]);

  return (
    <>
      <div
        style={{
          transitionDelay: `${transitionDelay}ms`,
          animationDelay: `${currentAnimationDelay}ms`,
        }}
        className={`
        min-w-[40px] min-h-[40px]
        w-10 h-10
        md:min-w-[64px] md:min-h-[64px]
        md:w-16 md:h-16
        text-xl md:text-3xl
        border border-neutral-500
        select-none
  flex justify-center items-center font-bold uppercase
  transition duration-100
  ${colorDecider}
  ${currentAnimation}
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
