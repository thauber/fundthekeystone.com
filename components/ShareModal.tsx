// components/DonationModal.tsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { fab } from '@fortawesome/free-brands-svg-icons'

type Props = {
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal = ({ isOpen, onClose }:Props) => {
  if (!isOpen) return null;

  const url = encodeURIComponent("https://fundthekeystone.com"); 
  const twitterText = encodeURIComponent("Build a bridge to the future. Fund the keystone. https://fundthekeystone.com");

  return (
    <div className="modal text-center">
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-content">
        <h2 className="text-2xl font-display mb-2">Thank you!</h2>
        <p className="mb-4 font-sans">Amplifying our message goes a long ways towards <span className="whitespace-nowrap">helping us meet our goal!</span></p>
        <div className="flex items-center justify-center p-6  space-x-4">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}&src=sdkpreparse`}
            target="_blank"
            className="icon"
          >
            <div>
            <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
            </div>
          </a>
          {/* says "Build a bridge to the future. Fund the keystone. https://fundthekeystone.com" */}
          <a href={`https://twitter.com/intent/tweet?text=${twitterText}&hashtags=fundthekeystone`}
            target="_blank"
            className="icon"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=&summary=&source=`} target="_blank" className="icon">
            <FontAwesomeIcon  icon={faLinkedin} />
          </a>
          <a href={`https://www.instagram.com/fundthekeystone`} target="_blank" className="icon">
            <FontAwesomeIcon  icon={faInstagram} />
          </a>
        </div>
      </div>

      <style jsx>{`
        .icon {
          @apply text-5xl p-1 md:text-6xl md:p-6 hover:text-cool-light;
        }
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex; align-items: center;
          justify-content: center;
        }

        .modal {
          @apply text-cool;
          z-index: 50;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-content {
          z-index: 60;
          width: 80%;
          max-width: 540px;
          background: white;
          padding: 30px 30px 10px;
        }

      `}</style>
    </div>
  );
};

export default ShareModal;
