// AboutSection.tsx

import React from "react";

const AboutSection: React.FC = () => {
    return (
        <section className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-3xl font-rubikMonoOne mb-4">About the Project</h3>
            <p className="text-xl font-roboto max-w-prose">Your detailed information about the project goes here...</p>
        </section>
    );
};

export default AboutSection;