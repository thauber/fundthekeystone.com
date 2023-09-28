// Import necessary libraries
import React, { useEffect, useState } from "react";

// Import components
import Header from "@/components/Header";
import QuoteSection from "@/components/QuoteSection";
import AboutSection from "@/components/AboutSection";
import VolunteerSection from "@/components/VolunteerSection";
import ContactSection from "@/components/ContactSection";
import DonateCollectionModal from "@/components/DonateCollectionModal";
import SuccessModal from "@/components/SuccessModal";
import Footer from "@/components/Footer";
import DonationSection from "@/components/DonationSection";
import ShareModal from "@/components/ShareModal";

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
  const [showShareModal, setShowShareModal] = useState(false);

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
        <ShareModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} />
        <div className={`snap-start snap-always h-full min-h-screen`}>
          <Header key="header" onDonate={()=>setShowDonationModal(true)}/>
        </div>
        <div className={`snap-always snap-start h-full min-h-screen`}>
          <QuoteSection key="quote" />
        </div>
        <div className={`snap-always snap-start h-full min-h-screen`}>
          <AboutSection key="about" />
        </div>
        <div className={`snap-always snap-start h-full min-h-screen`}>
          <DonationSection key="donate" />
        </div>
        <div className={`snap-always snap-start h-full min-h-screen`}>
          <VolunteerSection onShare={()=>setShowShareModal(true)} key="volnunteer" />
        </div>
        <div className={`snap-always snap-start h-full min-h-screen`}>
          <ContactSection onDonate={()=>{setShowDonationModal(true)}} key="contact" />
        </div>
        <Footer className="hidden md:block fixed bottom-0 left-0"/>
      </main>
    </div >
  );
};

export default LandingPage;
