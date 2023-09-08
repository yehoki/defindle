'use client';

import { useDispatch } from 'react-redux';
import { RxCross2 } from 'react-icons/rx';
import { onClose, onCloseAnimate } from '@/app/reducers/infoModalReducer';
import { useInfoModalSelector } from '@/app/store/store';
import { useCallback, useRef } from 'react';

interface InfoModalProps {}

const InfoModal: React.FC<InfoModalProps> = ({}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const isOpen = useInfoModalSelector((state) => state.infoModalReducer.isOpen);
  const animate = useInfoModalSelector(
    (state) => state.infoModalReducer.animate
  );

  const handleCloseModal = useCallback(() => {
    dispatch(onCloseAnimate());
    setTimeout(() => {
      dispatch(onClose());
    }, 300);
  }, [dispatch]);
  return (
    <>
      {isOpen && (
        <dialog
          id="info-modal"
          className="h-full w-full fixed bg-black/50
    flex items-center justify-center
    "
        >
          <div
            ref={modalRef}
            className={`rounded-sm bg-[#121214] border-[#1a1a1c] border
          text-white relative
          ${animate ? 'opacity-100' : 'opacity-0 translate-y-40'}
          transition
          `}
          >
            <button
              className="absolute top-2 right-2"
              onClick={handleCloseModal}
            >
              <RxCross2 size={20} />
            </button>
            <div className="pt-8 px-4 pb-4 md:w-[350px]">
              <h2>Statistics</h2>
              <div>Stats</div>
              <div>
                <h3>Guess Distribution</h3>
                <div>Guesses</div>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default InfoModal;
