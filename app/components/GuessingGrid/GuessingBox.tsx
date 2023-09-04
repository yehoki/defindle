'use client';

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
  if (!isGuessing) {
    return (
      <div
        className="h-16 w-16 border border-neutral-500
flex justify-center items-center font-bold uppercase
text-3xl
"
      >
        {rowGuess === undefined ? '' : rowGuess[guessCol]}
      </div>
    );
  }
  const extractString = () => {
    if (currentGuess.length > guessCol) {
      return currentGuess[guessCol];
    } else {
      return '';
    }
  };

  return (
    <div
      className="h-16 w-16 border border-neutral-500
  flex justify-center items-center font-bold uppercase
  text-3xl
  "
    >
      {extractString()}
    </div>
  );
};

export default GuessingBox;
