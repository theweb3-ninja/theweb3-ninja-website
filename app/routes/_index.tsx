import { useState } from 'react';
import { UserType } from '../../shared';
import {
  BottomBar,
  ContactForm,
  FAQSection,
  FeaturesSection,
  FinalCTASection,
  Footer,
  HeroSection,
  HowItWorksSection,
  SeoMeta,
  StatsSection,
  TestimonialsSection,
} from '../components';
import HeaderHero from '../components/web3ninja/HeaderHero';
import DeFiShowcase from '../components/web3ninja/DeFiShowcase';
import FollowSection from '../components/web3ninja/FollowSection';
import UXDesignGallery from '../components/web3ninja/UXDesignGallery';
import AboutNinjas from '../components/web3ninja/AboutNinjas';
import Web3Ready from '../components/web3ninja/Web3Ready';
import TokenCreation from '../components/web3ninja/TokenCreation';
import NewsletterForm from '../components/web3ninja/NewsletterForm';
import MetaverseShowcase from '../components/web3ninja/MetaverseShowcase';
import OldWebsitesGallery from '../components/web3ninja/OldWebsitesGallery';

const Index = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<UserType>(UserType.Organizer);

  const handleCTAClick = (userType: UserType) => {
    setSelectedUserType(userType);
    setIsContactFormOpen(true);
  };

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
      <HeroSection onCTAClick={handleCTAClick} />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <StatsSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
      <BottomBar />
      <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} userType={selectedUserType} />
    </div>
  );
};

export default Index;
