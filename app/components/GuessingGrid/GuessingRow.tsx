'use client';

interface GuessingRowProps {}

const GuessingRow: React.FC<GuessingRowProps> = ({}) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      <div className="h-10 w-10 border border-white"></div>
      <div className="h-10 w-10 border border-white"></div>
      <div className="h-10 w-10 border border-white"></div>
      <div className="h-10 w-10 border border-white"></div>
      <div className="h-10 w-10 border border-white"></div>
    </div>
  );
};

export default GuessingRow;
