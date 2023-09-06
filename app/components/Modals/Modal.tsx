'use client';

import { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <dialog
      open={true}
      className="h-full w-full fixed bg-black/50
    flex items-center justify-center
    "
    >
      {children}
    </dialog>
  );
};

export default Modal;
