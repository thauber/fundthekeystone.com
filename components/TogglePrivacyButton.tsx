import { useState } from 'react';
import { GlobeIcon, UserIcon, CheckIcon } from '@heroicons/react/solid';

interface TogglePrivacyButtonProps {
  initialValue: boolean;
  onToggle: (value: boolean) => void;
  className?: string;
}

const TogglePrivacyButton: React.FC<TogglePrivacyButtonProps> = ({ initialValue, onToggle, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(initialValue);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (value: boolean) => {
    setIsAnonymous(value);
    onToggle(value);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button type="button" onClick={togglePopover} className="px-4 py-2 border-bright border-2 tempt text-bright-dark bg-bright-lighter flex items-center">
        {isAnonymous ? <UserIcon className="h-5 w-5 mr-2" /> : <GlobeIcon className="h-5 w-5 mr-2" />} 
        {isAnonymous ? 'Anonymous' : 'Public'}
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button type="button" onClick={() => selectOption(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center w-full">
              {<CheckIcon className={`h-5 w-5 mr-2 ${isAnonymous ? "opacity-0" : ""}`} />} <GlobeIcon className="h-5 w-5 mr-2" /> Public
            </button>
            <button type="button" onClick={() => selectOption(true)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center w-full">
              {<CheckIcon className={`h-5 w-5 mr-2 ${isAnonymous ? "" : "opacity-0"}`} />} <UserIcon className="h-5 w-5 mr-2" /> Anonymous
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TogglePrivacyButton;
