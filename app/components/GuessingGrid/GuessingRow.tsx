'use client';

import GuessingBox from './GuessingBox';

interface GuessingRowProps {
  rowNumber: number;
  currentRow: number;
  currentGuess: string;
  guessArray: string[];
  correctWord: string;
}

const GuessingRow: React.FC<GuessingRowProps> = ({
  rowNumber,
  currentRow,
  currentGuess,
  guessArray,
  correctWord,
}) => {
  // Determines whether or not the current row is being changed
  const isGuessing = rowNumber === currentRow;
  // Finds value for current row guess
  const rowGuess = guessArray[rowNumber];
  return (
    <div className="grid grid-cols-5 gap-2">
      <GuessingBox
        currentGuess={currentGuess}
        guessCol={0}
        isGuessing={isGuessing}
        rowGuess={rowGuess}
        correctWord={correctWord}
      />
      <GuessingBox
        currentGuess={currentGuess}
        guessCol={1}
        isGuessing={isGuessing}
        rowGuess={rowGuess}
        correctWord={correctWord}
      />
      <GuessingBox
        currentGuess={currentGuess}
        guessCol={2}
        isGuessing={isGuessing}
        rowGuess={rowGuess}
        correctWord={correctWord}
      />
      <GuessingBox
        currentGuess={currentGuess}
        guessCol={3}
        isGuessing={isGuessing}
        rowGuess={rowGuess}
        correctWord={correctWord}
      />
      <GuessingBox
        currentGuess={currentGuess}
        guessCol={4}
        isGuessing={isGuessing}
        rowGuess={rowGuess}
        correctWord={correctWord}
      />
    </div>
  );
};

export default GuessingRow;
