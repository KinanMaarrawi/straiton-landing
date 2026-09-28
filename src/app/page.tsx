import { Nav } from '@/components/nav/Nav';
import { StickyCta } from '@/components/nav/StickyCta';
import { Arrival } from '@/components/sections/Arrival';
import { Assess } from '@/components/sections/Assess';
import { Complete } from '@/components/sections/Complete';
import { Eligibility } from '@/components/sections/Eligibility';
import { Faq } from '@/components/sections/Faq';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { Share } from '@/components/sections/Share';
import { Support } from '@/components/sections/Support';
import { Track } from '@/components/sections/Track';
import { Why } from '@/components/sections/Why';
import { PageStateProvider } from '@/components/state/PageState';

/**
 * The page is the payment's route: Dubai (hero) → four waypoints → India
 * (the assessment form). Section order and lanes: DESIGN.md §9.
 */
export default function Home() {
  return (
    <PageStateProvider>
      <a className="skip-link" href="#assessment">
        Skip to assessment
      </a>
      <Nav />
      <main id="main" className="route-root">
        <Hero />
        <Eligibility />
        <Why />
        <Share />
        <Assess />
        <Complete />
        <Track />
        <Support />
        <Faq />
        <Arrival />
      </main>
      <Footer />
      <StickyCta />
    </PageStateProvider>
  );
}
