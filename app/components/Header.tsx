'use client';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <header
      className="w-full flex justify-between items-center 
    border-b-[1px] border-neutral-400 px-8 py-4"
    >
      <p className="font-bold text-xl">?</p>
      <h1 className="text-4xl font-bold">Defindle</h1>
      <p>Cogs</p>
    </header>
  );
};

export default Header;
