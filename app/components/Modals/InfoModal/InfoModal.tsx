'use client';

import { useDispatch } from 'react-redux';
import { RxCross2 } from 'react-icons/rx';
import { onClose, onCloseAnimate } from '@/app/reducers/infoModalReducer';
import { useInfoModalSelector } from '@/app/store/store';
import { useCallback, useEffect, useRef } from 'react';
import StatisticSpread from './StatisticSpread';

interface InfoModalProps {}

const InfoModal: React.FC<InfoModalProps> = ({}) => {
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
          onClick={handleCloseModal}
          id="info-modal"
          className="h-full w-full fixed bg-black/50
    flex items-center justify-center z-50
    "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`rounded-sm bg-[#121214] border-[#1a1a1c] border
          text-white relative w-full
          max-w-[520px]
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
            <div
              className="pt-16 px-4 pb-4 m
            w-full flex justify-center flex-col items-center
            "
            >
              <h2 className="pl-2 uppercase font-medium mb-2 w-[250px]">
                Statistics
              </h2>
              <ul className="flex gap-8 mb-4 w-[320px]">
                <li>
                  <div className="text-center text-5xl font-light">12</div>
                  <div className="text-[10px] flex items-center justify-center">
                    Played
                  </div>
                </li>
                <li>
                  <div className="text-center text-5xl font-light">55</div>
                  <div className="text-[10px] flex items-center justify-center">
                    Win %
                  </div>
                </li>
                <li>
                  <div className="text-center text-5xl font-light">2</div>
                  <div className="text-[10px] flex items-center justify-center">
                    Current Streak
                  </div>
                </li>
                <li>
                  <div className="text-center text-5xl font-light">10</div>
                  <div className="text-[10px] flex items-center justify-center">
                    Max Streak
                  </div>
                </li>
              </ul>
              <div className="pb-16">
                <h3 className="pl-2 uppercase font-medium w-[250px] mb-2">
                  Guess Distribution
                </h3>
                <StatisticSpread />
              </div>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default InfoModal;
