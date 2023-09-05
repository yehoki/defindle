import getTodaysDefinition from './actions/getTodaysDefinition';
import GuessingGrid from './components/GuessingGrid/GuessingGrid';

export default async function Home() {
  const todaysWord = await getTodaysDefinition();

  return (
    <>
      <main className="h-full">
        {/* <h3 className="text-2xl">Word definition</h3> */}
        <div className="">
          <GuessingGrid todaysWord={todaysWord} />
        </div>
      </main>
    </>
  );
}
