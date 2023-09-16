// Header.tsx
import React, { useEffect, useState } from 'react';
import FacebookIcon from './icons/Facebook';
import InstagramIcon from './icons/Instagram';
import Chevron from './icons/Chevron';

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
  const fontSize = scrollY > breakpoint ? "text-sm md:text-xl" : "text-[12vw] leading-[12vw] lg:text-[14vw]  lg:leading-[14vw]";
  const bgColor = scrollY > breakpoint ? "bg-field" : "bg-transparent";
  const textColor = scrollY > breakpoint ? "text-white" : "text-bright drop-shadow-lg";
  const height = scrollY > breakpoint ? "h-16" : "h-full";
  const top = scrollY > breakpoint ? "" : "top-10";
  const right = scrollY > breakpoint ? "right-2" : "right-10";
  const social = scrollY > breakpoint ? "hidden md:block" : "";
  const donate = scrollY > breakpoint ? "mx-4 " : "text-4xl my-2 mx-8 ";

  return (
    <header
      className={`z-20 w-full p-6 fixed top-0 transition-all duration-200 ease-in-out ${bgColor} ${textColor} ${height} flex justify-between items-center`}
    >
      {scrollY <= breakpoint && <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <video autoPlay loop muted style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}>
          <source src="/video/hero-hq.webm" type="video/mp4" />
        </video>
      </div>}
      <div className="relative z-10 w-full break-words opacity-90">
        <h1 className={`${fontSize} font-display transition-all duration-200 ease-in-out w-full`}>
          <span>Fund</span>{scrollY <= breakpoint && <br />}
          <span>The</span>{scrollY <= breakpoint && <br />}
          <span>Keystone</span>
        </h1>
      </div>
      <div className={`absolute z-10 flex h-16 items-center ${top} ${right}`}>
        <div className="flex items-center rounded justify-normal border-2 mx-1 hover:bg-bright">
          <a onClick={onDonate} className={`${donate} transition-all duration-200 ease-in-out text-white cursor-pointer`}>DONATE</a>
        </div>
      </div>
      <div
        className='z-20 absolute -mx-6 bottom-6 w-full flex justify-center animate-bounce cursor-pointer'
        onClick={() => {
          const newY = window.scrollY + window.innerHeight;
          window.scrollTo({ top: newY, behavior: 'smooth' });
        }}
      >
        <Chevron color={"white"}/>
      </div>
    </header>
  );
};

export default Header;