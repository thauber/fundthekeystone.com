// DonationSection.tsx

import React from "react";
import { Parallax } from 'react-scroll-parallax';
import DonateCollectionModal from "./DonateCollectionModal";

interface DonationSectionProps {
}

const DonationSection: React.FC<DonationSectionProps> = ({ }) => {
    return (
        <section className="flex flex-col items-center justify-center p-6 min-h-screen py-20 w-full">
            <DonateCollectionModal grounded/>
        </section>
    );
};

export default DonationSection;
