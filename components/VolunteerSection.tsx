// VolunteerSection.tsx

import React from "react";
import { Parallax } from 'react-scroll-parallax';

const VolunteerSection: React.FC = () => {
    return (
        <section className="flex flex-col items-end justify-center p-6 text-right h-screen w-full snap-start">
            <Parallax y={[-20, 20]}>
                <h3 className="text-3xl font-rubikMonoOne mb-4 self-center">Become a Volunteer</h3>
            </Parallax>
            <p className="text-xl font-roboto">We're grateful for our dedicated volunteers, and we're always looking for more help. Join Tony Hauber, Ketaki Poyekar, Annie Palas, and Sebastienne Tercero in our efforts to repair the Elkader Keystone Bridge.</p>
            {/* Replace src with your image path */}
            <img className="my-4" src="/path/to/your/image.jpg" alt="Volunteers" />
        </section>
    );
};

export default VolunteerSection;
