// Import necessary libraries
import React, { useState } from "react";
import { motion } from "framer-motion";

// Import components
import DonationModal from "@/components/DonationModal";
import ExitIntentModal from "@/components/ExitIntentModal";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProgressSection from "@/components/ProgressSection";
import DonationSection from "@/components/DonationSection";
import VolunteerSection from "@/components/VolunteerSection";
import TestimonialSection from "@/components/TestimonialSection";
import UpdatesSection from "@/components/UpdatesSection";
import ContactSection from "@/components/ContactSection";

export const LandingPage: React.FC = () => {
    const [showDonationModal, setShowDonationModal] = useState(false);
    const [showExitIntentModal, setShowExitIntentModal] = useState(false);

    // Triggers when the user shows intent to leave the page
    const handleExitIntent = () => {
        setShowExitIntentModal(true);
    }

    const sections = [
      <Header key="header"/>,
      <HeroSection key="hero"/>,
      <AboutSection key="about"/>,
      <ProgressSection key="progress"/>,
      <DonationSection key="donation" onClick={() => setShowDonationModal(true)} />,
      <VolunteerSection key="volnunteer" />,
      <TestimonialSection key="testomony" />,
      <UpdatesSection key="update" />,
      <ContactSection key="contact" />,
    ]

    return (
        <div className="min-h-screen font-rubikMonoOne bg-white text-blue-700">

            <main>

              {sections.map((section, index) => (
                <div key={index} className="w-full h-screen snap-start">
                  {section}
                </div>
              ))}

            </main>

            {showDonationModal && <DonationModal onClose={() => setShowDonationModal(false)} />}
            
            {showExitIntentModal && <ExitIntentModal onClose={() => setShowExitIntentModal(false)} />}
        </div>
    );
};

export default LandingPage;
