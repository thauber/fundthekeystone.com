// Import necessary libraries
import React, { useEffect, useState } from "react";

// Import components
import Header from "@/components/Header";
import AboutSection from "@/components/AboutSection";
import VolunteerSection from "@/components/VolunteerSection";
import ContactSection from "@/components/ContactSection";
import DonateCollectionModal from "@/components/DonateCollectionModal";
import SuccessModal from "@/components/SuccessModal";

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
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    //if checkout session is in url, show success modal
    const urlParams = new URLSearchParams(window.location.search);
    const session_id = urlParams.get('checkout');
    if (session_id) {
      setShowSuccessModal(true);
    }
  }, []);

  if (typeof window !== 'undefined') {
    window.document.body.addEventListener('wheel', (event) => {
      const delta = event.deltaY;

      window.document.body.scrollBy({
        top: delta,
        behavior: 'smooth'
      });
    });
  }




  return (
    <div className="min-h-screen font-display bg-field text-blue-700">
      <main>
        <DonateCollectionModal isOpen={showDonationModal} onClose={() => setShowDonationModal(false)} />
        <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
        <div className={`md:snap-start h-full min-h-screen`}>
          <Header key="header" onDonate={()=>setShowDonationModal(true)}/>
        </div>
        <div className={`md:snap-always md:snap-start h-full min-h-screen`}>
          <AboutSection key="about" />,
        </div>
        <div className={`md:snap-always md:snap-start h-full min-h-screen`}>
          <VolunteerSection key="volnunteer" />,
        </div>
        <div className={`md:snap-always md:snap-start h-full min-h-screen`}>
          <ContactSection onDonate={()=>{setShowDonationModal(true)}} key="contact" />,
        </div>
      </main>
    </div >
  );
};

export default LandingPage;
