import { useEffect } from 'react';
import { Nav } from './Nav';
import { Hero } from './Hero';
import { Marquee } from './Marquee';
import { SelectedWork } from './SelectedWork';
import { Manifesto } from './Manifesto';
import { Footer } from './Footer';

export default function Home() {
  useEffect(() => { document.title = 'Sohum Bhatnagar — Designer, Photographer, Storyteller'; }, []);

  return (
    <div className="camera-theme vf-home" data-testid="home">
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <SelectedWork />
        <Manifesto />
        <Footer />
      </main>
    </div>
  );
}
