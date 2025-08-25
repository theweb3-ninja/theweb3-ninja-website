import { BottomBar, Footer, SeoMeta, TestimonialsSection } from '../components';
import AboutNinjas from '../components/web3ninja/AboutNinjas';
import DeFiShowcase from '../components/web3ninja/DeFiShowcase';
import FollowSection from '../components/web3ninja/FollowSection';
import HeaderHero from '../components/web3ninja/HeaderHero';
import MetaverseShowcase from '../components/web3ninja/MetaverseShowcase';
import NewsletterForm from '../components/web3ninja/NewsletterForm';
import OldWebsitesGallery from '../components/web3ninja/OldWebsitesGallery';
import TokenCreation from '../components/web3ninja/TokenCreation';
import UXDesignGallery from '../components/web3ninja/UXDesignGallery';
import Web3Ready from '../components/web3ninja/Web3Ready';

const Index = () => {
  return (
    <div className="min-h-screen">
      <SeoMeta />
      {/* Web3 Ninja header/hero section (from carrd index.html) */}
      <HeaderHero />
      <DeFiShowcase />
      <UXDesignGallery />
      <AboutNinjas />
      <Web3Ready />
      <TokenCreation />
      <NewsletterForm />
      <FollowSection />
      <MetaverseShowcase />
      <OldWebsitesGallery />
      <TestimonialsSection />
      {/* <FAQSection /> */}
      <Footer />
      <BottomBar />
    </div>
  );
};

export default Index;
