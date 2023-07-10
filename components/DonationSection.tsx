// DonationSection.tsx

import React from "react";
import { Parallax } from 'react-scroll-parallax';

interface DonationSectionProps {
    onClick: () => void;
}

const DonationSection: React.FC<DonationSectionProps> = ({ onClick }) => {
    return (
        <section className="flex flex-col items-start justify-center p-6 h-screen w-full snap-start">
            <Parallax opacity={[.7, 1]}>
                <h3 className="text-3xl font-rubikMonoOne mb-4 self-center">Make a Donation</h3>
            </Parallax>
            <p className="text-xl font-roboto mb-6">Your contributions will help us save the iconic Elkader Keystone Bridge. Any amount you give will have a lasting impact on our community.</p>
            <button onClick={onClick} className="px-6 py-2 bg-blue-600 text-white rounded-lg">Donate Now</button>
        </section>
    );
};

export default DonationSection;
