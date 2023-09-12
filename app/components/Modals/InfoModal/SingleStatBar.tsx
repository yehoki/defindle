'use client';

interface SingleStatBarProps {
  guessNumber: number;
  guessCount: number;
  highestCount: number;
  todaysGuessNumber?: number;
}

const SingleStatBar: React.FC<SingleStatBarProps> = ({
  guessNumber,
  guessCount,
  highestCount,
  todaysGuessNumber,
}) => {
  //  make sure highestCount !== 0
  const widthPercentage =
    guessCount === 0 || highestCount === 0
      ? 7
      : (guessCount / highestCount) * 100;
  return (
    <div className="flex gap-1">
      <div className="text-xs font-semibold">{guessNumber}</div>
      <div
        style={{ width: `${widthPercentage.toFixed(0)}%` }}
        className={`
        ${todaysGuessNumber === guessNumber ? 'bg-correct' : 'bg-[#3a3a3d]'}
         mb-1 px-1 py-[1px] text-right text-xs`}
      >
        {guessCount}
      </div>
    </div>
  );
};

export default SingleStatBar;
