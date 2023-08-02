// Import necessary libraries
import React, { useState } from "react";

// Import components
import Header from "@/components/Header";
import AboutSection from "@/components/AboutSection";
import VolunteerSection from "@/components/VolunteerSection";
import ContactSection from "@/components/ContactSection";

      /*
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
    { showDonationModal && <DonationModal onClose={() => setShowDonationModal(false)} /> }
    { showExitIntentModal && <ExitIntentModal onClose={() => setShowExitIntentModal(false)} /> }
      */

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



  return (
    <div className="min-h-screen font-rubikMonoOne bg-field text-blue-700">
      <main>
        <div className={`snap-start h-full min-h-screen`}>
          <Header key="header" />,
        </div>
        <div className={`snap-always h-full min-h-screen`}>
          <AboutSection key="about" />,
        </div>
        <div className={`md:snap-always md:snap-start h-full min-h-screen`}>
          <VolunteerSection key="volnunteer" />,
        </div>
        <div className={`md:snap-always md:snap-start h-full min-h-screen`}>
          <ContactSection key="contact" />,
        </div>
      </main>
    </div >
  );
};

export default LandingPage;
