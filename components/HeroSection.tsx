// HeroSection.tsx

import React from "react";

const HeroSection: React.FC = () => {
    return (
        <section className="flex flex-col items-center justify-center p-6 text-center h-screen w-screen">
            <h2 className="text-4xl font-display mb-4">Help Us Save Our Historic Keystone Archway Bridge</h2>
            <p className="text-xl font-roboto max-w-prose">Your brief summary about the project goes here...</p>
            {/* Replace src with your image path */}
            <img className="my-4" src="/path/to/your/image.jpg" alt="Keystone Bridge" />
        </section>
    );
};

export default HeroSection;