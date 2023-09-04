'use client';

import GuessingRow from './GuessingRow';

interface GuessingGridProps {}

const GuessingGrid: React.FC<GuessingGridProps> = ({}) => {
  return (
    <section className="grid grid-rows-6 gap-2">
      <GuessingRow />
      <GuessingRow />
      <GuessingRow />
      <GuessingRow />
      <GuessingRow />
      <GuessingRow />
    </section>
  );
};

export default GuessingGrid;
