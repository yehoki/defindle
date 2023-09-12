import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';
import InfoModal from './components/Modals/InfoModal/InfoModal';
import InfoModalProvider from './providers/infoModalProvider';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Defindle',
  description: 'Guess the word from its definition',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} bg-[#121214] text-white min-h-[100dvh]`}
      >
        <InfoModalProvider>
          <InfoModal />
          <Header />
          {children}
          <Footer />
        </InfoModalProvider>
      </body>
    </html>
  );
}
