import Head from './sections/Head';
import Home from './sections/Home';
import Foot from './sections/Foot';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head />
      <main className="flex-grow p-6">
        <Home />
      </main>
      <Foot />
    </div>
  );
}
