// AboutSection.tsx

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import React, { useCallback } from "react";


const AboutSection: React.FC = () => {
  const container = useCallback((container: HTMLElement) => {
    if (container) {
      gsap.registerPlugin(ScrollTrigger);
      console.log(container)
      const backdrop = container.querySelector('.backdrop-bridge')
      gsap.to(backdrop, {
        filter: "blur(6px) brightness(0.5)",
        scrollTrigger: {
          trigger: container,
          start: 'top 5%',
          end: 'top top',
          scrub: true,
        }
      })
      const info = container.querySelector('.info')
      const quote = container.querySelector('.quote')
      gsap.to([info, quote], {
        opacity: 1,
        scrollTrigger: {
          trigger: container,
          start: 'top 5%',
          end: 'top top',
          scrub: true,
        }
      })
    }
  }, []);

  console.log(ScrollTrigger)

  return (
    <section ref={container} className="md:h-screen w-screen p-6 text-center md:text-left relative">
      <div className="backdrop-bridge" />
      <div className="w-full md:h-screen flex flex-col md:flex-row items-center justify-center">
        <div className="info z-10 w-full md:w-1/2 bg-cool p-10 md:m-10 mx-10 my-40">
          <h3 className="text-4xl font-rubikMonoOne mb-4 text-white">About the Project</h3>
          <p className="lg:text-lg xl:text-2xl font-roboto max-w-prose text-white mb-6">
          We&apos;re a friendly bunch of volunteers with a shared interest in Elkader&apos;s Keystone Bridge. It&apos;s not just any bridge; it&apos;s the longest keystone archway bridge this side of the Mississippi and has been part of our town&apos;s scenery for almost 150 years.
          </p>
          <p className="lg:text-lg xl:text-2xl font-roboto max-w-prose text-white mb-6">
            So, come along, be a part of this initiative and help us keep our bridge standing strong for generations to come. It&apos;s a great chance to contribute to Elkader&apos;s story in a meaningful way.
          </p>
        </div>
        <div className="quote z-10 w-full md:w-1/2 px-6 lg:m-10 lg:mx-10 my-40">
          <p className="text-2xl lg:text-4xl max-w-prose text-bright drop-shadow-lg">The great stone arch bridge which spans the Turkey river and which was built, not for a time, but for <span className="font-bold text-4xl md:text-5xl lg:text-7xl">eternity</span></p>
          <p className="lg:px-10 pt-4 text-gray-300 lg:text-2xl font-roboto max-w-prose uppercase font-bold">- Memoirs of Clayton County</p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
