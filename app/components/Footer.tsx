'use client';

import { AiFillGithub } from 'react-icons/ai';

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer
      className="w-40 mx-auto 
    flex gap-2 items-center"
    >
      <p>Yehoki 2023</p>
      <AiFillGithub size={24} />
    </footer>
  );
};

export default Footer;
