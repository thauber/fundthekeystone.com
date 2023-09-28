// AboutSection.tsx

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import React, { useCallback } from "react";


const AboutSection: React.FC = () => {

  return (
    <section className="min-h-screen flex justify-end items-center w-screen text-center md:text-left relative">
      <div className="backdrop backdrop-repair" />
      <div className="info z-10 w-full md:w-1/2 bg-cool p-10 md:m-10 mx-10 my-20 opacity-90">
        <h3 className="text-4xl font-display mb-4 text-white">About the Project</h3>
        <p className="lg:text-lg xl:text-2xl font-roboto max-w-prose text-white mb-6">
        During a bridge restoration and improvement project a crack was discovered that put the bridge’s structural
integrity in jeopardy. Using incredible feats of modern engineering the city was able to replace all of the stones in the arch
that were damaged, but unfortunately this project expanded costs by $3 million. 
        </p>
        <p className="lg:text-lg xl:text-2xl font-roboto max-w-prose text-white mb-6">
          This cost will have a significant impact on property tax and the city’s ability to take on future projects, unless we can reduce the impact via donations.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
