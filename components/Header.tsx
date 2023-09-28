// Header.tsx
import React, { useEffect, useState } from 'react';
import Chevron from './icons/Chevron';
import DonationToaster from './DonationToaster';

const breakpoint = 100;

const Header = ({onDonate}:{onDonate:()=>void}) => {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate the font size and color based on scroll position
  const isHeader = scrollY > breakpoint;
  const fontSize = isHeader ? "text-sm md:text-xl" : "text-[21vw] leading-[21vw] md:text-[13vw] md:leading-[14vw] lg:text-[14vw]  lg:leading-[14vw]";
  const bgColor = isHeader ? "bg-field" : "bg-transparent";
  const textColor = isHeader ? "text-white" : "text-bright drop-shadow-lg";
  const height = isHeader ? "h-16" : "h-full";
  const top = isHeader ? "" : "top-10";
  const right = isHeader ? "right-2" : "right-10";
  const social = isHeader ? "hidden md:block" : "";
  const donate = isHeader ? "mx-4 " : "text-2xl my-1 mx-4 md:text-4xl my-2 mx-8 ";

  return (
    <header
      className={`z-20 w-full p-4 fixed top-0 transition-all duration-200 ease-in-out ${bgColor} ${textColor} ${height} flex justify-between items-center`}
    >
      {scrollY <= breakpoint && <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <video autoPlay playsInline loop muted style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}>
          <source src="/video/hero-hq.webm" type="video/webm" />
          <source src="/video/hero-hq.mp4" type="video/mp4" />
        </video>
      </div>}
      <div className="relative z-10 w-full break-words opacity-90">
        <h1 className={`${fontSize} font-display transition-all duration-200 ease-in-out w-full`}>
          <span>Fund</span>{!isHeader && <br />}
          <span>The</span>{!isHeader && <br />}
          <span>Key</span>{!isHeader && <br className="md:hidden"/>}<span>stone</span>
        </h1>
      </div>
      <div className={`absolute z-10 flex h-13 items-center ${top} ${right}`}>
        <div className="flex items-center rounded justify-normal border-2 mx-1 tempt relative">
          <button type="button" onClick={onDonate} className={`${donate} transition-all duration-200 ease-in-out text-white cursor-pointer`}>DONATE</button>
        </div>
      </div>
      <div
        className='z-20 absolute -mx-6 bottom-6 w-full flex justify-center animate-bounce cursor-pointer'
        onClick={() => {
          const newY = window.scrollY + window.innerHeight + 100;
          window.scrollTo({ top: newY, behavior: 'smooth' });
        }}
      >
        <Chevron color={"white"}/>
      </div>
    </header>
  );
};

export default Header;