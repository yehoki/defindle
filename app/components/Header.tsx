'use client';
import { LiaChartBarSolid } from 'react-icons/lia';
import { FaCog } from 'react-icons/fa';
interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <header
      className="w-full flex justify-between items-center 
    border-b-[1px] border-neutral-400 px-8 py-4"
    >
      <button className="font-bold text-xl">?</button>
      <h1 className="text-4xl font-bold">Defindle</h1>
      <div className="flex gap-4 items-center">
        <button>
          <LiaChartBarSolid size={24} />
        </button>
        <button>
          <FaCog size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
