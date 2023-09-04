import GuessingGrid from './components/GuessingGrid/GuessingGrid';

export default function Home() {
  return (
    <>
      <main className="h-full">
        <h2>Main Grid</h2>
        <h3 className="text-2xl">Word definition</h3>
        <div className="flex justify-center items-center mb-20">
          <GuessingGrid />
        </div>
      </main>
    </>
  );
}
