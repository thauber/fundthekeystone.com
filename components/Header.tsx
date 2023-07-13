// Header.tsx
import React, { useEffect, useState } from 'react';
import FacebookIcon from './icons/Facebook';

const breakpoint = 100;

const Header: React.FC = () => {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate the font size and color based on scroll position
  const fontSize = scrollY > breakpoint ? "text-xl" : "text-9xl";
  const bgColor = scrollY > breakpoint ? "bg-green-600" : "bg-transparent";
  const textColor = scrollY > breakpoint ? "text-white" : "text-black";
  const height = scrollY > breakpoint ? "h-16" : "h-full";
  const top = scrollY > breakpoint ? "top-2" : "top-10";
  const right = scrollY > breakpoint ? "right-2" : "right-10";

  return (
    <header
      className={`w-full p-6 fixed top-0 transition-all duration-200 ease-in-out ${bgColor} ${textColor} ${height} flex justify-between items-center`}
    >
      {scrollY <= breakpoint && <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <video autoPlay loop muted style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}>
          <source src="/video/hero.webm" type="video/mp4" />
        </video>
      </div>}
      <div className="relative z-10 w-full break-words">
        <h1 className={`${fontSize} font-rubikMonoOne transition-all duration-200 ease-in-out w-full`}>
          <span>Fund</span>{scrollY <= breakpoint && <br />}
          <span>The</span>{scrollY <= breakpoint && <br />}
          <span>Keystone</span>
        </h1>
      </div>
      <div className={`absolute z-10 right-10 flex ${top} ${right}`}>
        <div className="flex items-center rounded justify-normal border-2 mx-4">
          <a href="https://" className="mx-4 transition-all duration-200 ease-in-out text-white">DONATE</a>
        </div>
        <a href="https://facebook.com/fundthekeystone" className="mx-4 transition-all duration-200 ease-in-out"><FacebookIcon /></a>
        <a href="https://instagram.com/fundthekeystone" className="mx-4 transition-all duration-200 ease-in-out"><FacebookIcon /></a>
      </div>
    </header>
  );
};

export default Header;