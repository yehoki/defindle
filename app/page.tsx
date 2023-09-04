import GuessingGrid from './components/GuessingGrid/GuessingGrid';

export default function Home() {
  return (
    <>
      <main className="h-full">
        {/* <h3 className="text-2xl">Word definition</h3> */}
        <div className="">
          <GuessingGrid />
        </div>
      </main>
    </>
  );
}
