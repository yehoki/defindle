'use client';

import { Provider } from 'react-redux';
import { store } from '../store/store';

interface InfoModalProviderProps {
  children: React.ReactNode;
}

const InfoModalProvider: React.FC<InfoModalProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default InfoModalProvider;
