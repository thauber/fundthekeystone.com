// ProgressSection.tsx

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProgressSection: React.FC = ({goal, raised}:{goal:number, raised:number}) => {
    const [contribution, setContribution] = useState(0); // Update with the actual contribution

    // Calculate the percentage of the goal that has been raised
    const percentageContribution = Math.round((contribution / goal) * 100);
    const percentageRaised = Math.round((raised / goal) * 100);

    const headerRef = useRef<HTMLHeadingElement | null>(null);
    const progressBarRef = useRef<HTMLDivElement | null>(null);
    const contributionBarRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (headerRef.current && progressBarRef.current && contributionBarRef.current) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: progressBarRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: true,
                },
            });

            tl.fromTo(
                headerRef.current,
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1 }
            ).fromTo(
                progressBarRef.current,
                { width: "0%" },
                { width: `${percentageRaised}%` }
            )
        }
    }, [percentageRaised, percentageContribution]);

return (
        <section className="flex flex-col items-center justify-center p-6 text-center bg-green-500 text-white h-screen w-full relative">
            <h3 className="text-3xl font-rubikMonoOne mb-4" ref={headerRef}>Progress</h3>
            <div className="w-full h-4 bg-gray-200 rounded-full relative" style={{height: '40px'}}>
                <div ref={progressBarRef} style={{ width: `${percentageRaised}%` }} className="h-full bg-blue-500 rounded-full absolute"></div>
                <div ref={contributionBarRef} style={{ width: `${percentageContribution}%` }} className="h-full bg-yellow-500 rounded-full absolute"></div>
            </div>
            <p className="text-xl font-roboto mt-2">${raised} raised of our ${goal} goal</p>
        </section>
    );
};

export default ProgressSection;
