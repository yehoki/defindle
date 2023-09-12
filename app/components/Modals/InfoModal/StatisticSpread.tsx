'use client';

import SingleStatBar from './SingleStatBar';

interface StatisticSpreadProps {}

const StatisticSpread: React.FC<StatisticSpreadProps> = ({}) => {
  const sampleStats = {
    guesses: [
      { guessNumber: 1, guessCount: 5 },
      { guessNumber: 2, guessCount: 0 },
      { guessNumber: 3, guessCount: 7 },
      { guessNumber: 4, guessCount: 9 },
      { guessNumber: 5, guessCount: 2 },
      { guessNumber: 6, guessCount: 12 },
    ],
    highestCount: 12,
  };
  return (
    <div>
      {sampleStats.guesses.map((guess) => {
        return (
          <SingleStatBar
            key={guess.guessNumber}
            guessNumber={guess.guessNumber}
            guessCount={guess.guessCount}
            highestCount={sampleStats.highestCount}
            todaysGuessNumber={4}
          />
        );
      })}
    </div>
  );
};

export default StatisticSpread;

// const newGame = {
//   game: {
//     id: 786,
//     dayOffset: 815,
//     boardState: ['sport', '', '', '', '', ''],
//     currentRowIndex: 1,
//     status: 'IN_PROGRESS',
//     // FAIL WIN IN_PROGRESS ENUM
//     timestamps: { lastPlayed: 1694513242978, lastCompleted: 1694435561558 },
//   },
//   settings: { hardMode: false, darkMode: true, colorblindMode: false },
//   stats: {
//     currentStreak: 1,
//     maxStreak: 8,
//     guesses: { '1': 1, '2': 0, '3': 5, '4': 6, '5': 4, '6': 5, fail: 4 },
//     winPercentage: 84,
//     gamesPlayed: 25,
//     gamesWon: 21,
//     averageGuesses: 4,
//     isOnStreak: true,
//     hasPlayed: true,
//   },
//   timestamp: 1694513242,
//   schemaVersion: '0.2.0',
// };
