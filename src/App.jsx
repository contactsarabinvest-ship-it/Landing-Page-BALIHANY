import Header from './components/Header';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import WhoCanJoin from './components/WhoCanJoin';
import EmailSignup from './components/EmailSignup';
import Vision from './components/Vision';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <Hero />
        <PainPoints />
        <WhoCanJoin />
        <EmailSignup />
        <Vision />
        <Footer />
      </main>
    </div>
  );
}

export default App;
