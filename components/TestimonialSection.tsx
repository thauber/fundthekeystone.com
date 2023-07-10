import React from "react";

const TestimonialSection: React.FC = () => {
    return (
        <section className="flex flex-col items-center justify-center p-6 text-center bg-yellow-400">
            <h3 className="text-3xl font-rubikMonoOne mb-4 text-white">What People Say</h3>
            <blockquote className="text-xl font-roboto italic max-w-prose">
                <p>"The great stone arch bridge which spans the Turkey river and which was built, seemingly, not for a time but for eternity"</p>
                <footer className="mt-2 text-white">— Unknown</footer>
            </blockquote>
            <blockquote className="text-xl font-roboto italic max-w-prose mt-6">
                <p>“This is what story making is about. People don’t want to donate to a construction project. They want to donate to an icon of Elkader history. They want to donate to a symbol of connectivity. They want to donate to something that is defined by its future impact. We will have to do a better job about making them feel like they are part of making a difference and not just ‘prepaying taxes,’”— Hauber explained.</p>
                <footer className="mt-2 text-white">— Local Politician</footer>
            </blockquote>
        </section>
    );
};

export default TestimonialSection;
