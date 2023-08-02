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

    if (typeof window !== 'undefined') {
      window.document.onblur = handleExitIntent;
      window.document.body.addEventListener('wheel', (event) => {
        const delta = event.deltaY;
      
        window.document.body.scrollBy({
          top: delta,
          behavior: 'smooth'
        });
      });
    }


    const sections = [
      <Header key="header"/>,
      <AboutSection key="about"/>,
      <VolunteerSection key="volnunteer" />,
      <ContactSection key="contact" />,
    ]

    return (
        <div className="min-h-screen font-rubikMonoOne bg-field text-blue-700">

            <main>

              {sections.map((section, index) => {
                let snaps = "md:snap-always md:snap-start"
                if (index == 0) snaps = "snap-start"
                if (index == 1) snaps = "snap-start snap-always"
                return (
                  <div key={index} className={`${snaps} h-full min-h-screen`}>
                    {section}
                  </div>
                )
              })}

            </main>

            {showDonationModal && <DonationModal onClose={() => setShowDonationModal(false)} />}
            
            {showExitIntentModal && <ExitIntentModal onClose={() => setShowExitIntentModal(false)} />}
        </div>
    );
};

export default LandingPage;
