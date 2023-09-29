// Header.tsx
import React, { useEffect, useState } from 'react';
import CloseIcon from './icons/Close';

const Footer = ({className}:{className?:string}) => {
  const [showAbout, setShowAbout] = useState(false);
  const [showCredits, setShowCredits] = useState(false);

  return (
    <footer
      className={`z-30 bottom-0 left-0 ${className ? className : ""}`}
    >
      <div className="text-xs sm:text-default pb-4 px-8 flex items-start flex-row text-left md:text-center justify-between">
        <button type="button" onClick={()=>setShowAbout(true)}>About</button>
        <span className="px-2">•</span>
        <a target="_blank" href="mailto:fundthekeystone@gmail.com">Contact</a>
        <span className="px-2">•</span>
        <button type="button" onClick={()=>setShowCredits(true)}>Credits</button>
      </div>
      <div className={`fixed transition-transform top-full px-4 flex flex-col w-full bg-white ${showAbout ? "-translate-y-full": ""}`}>
        <div className='flex items-center'>
          <p className="text-6xl flex-grow py-4">Who are we?</p><button onClick={()=>setShowAbout(false)}><CloseIcon /></button>
        </div>
        <p>
          We&apos;re a friendly bunch of volunteers with a shared passion for Elkader&apos;s historic Keystone Bridge. 
        </p>
        <div className='w-full max-w-2/3 grid grid-cols-2 md:grid-cols-4 items-center justify-around py-10'>
          {[
            "Tony Hauber",
            "Ketaki Poyekar",
            "Sebastienne Tercero",
            "Annie Palas",
          ].map(src=> {
            return <div className="flex flex-col items-center justify-start h-full" key={src}>
              <img className="rounded-full w-20 h-20 md:w-36 md:h-36" src={`images/profiles/${src}.jpg`} />
              <p className="pt-4 text-sm md:text-lg">{src}</p>
            </div>
          })}
        </div>
      </div>
      <div className={`fixed transition-transform top-full px-4 flex flex-col w-full bg-white ${showCredits ? "-translate-y-full": ""}`}>
        <div className='flex items-center'>
          <p className="text-3xl md:text-6xl flex-grow py-4">Special Thanks To</p><button onClick={()=>setShowCredits(false)}><CloseIcon /></button>
        </div>
        <div className='w-full max-w-2/3 flex grid-cols-2 md:grid-cols-4 items-center justify-around py-10'>
          <a href="https://www.facebook.com/ProfessionallyDrivenProductions" target="_blank" className="hover:text-bright">
            <div className="list flex flex-col items-center justify-start h-full">
              <img className="rounded-full w-20 h-20 md:w-36 md:h-36" src={`images/profiles/Jarod Bormann.jpg`} />
              <p className="pt-4 text-sm md:text-lg">Jarod Bormann</p>
              <p className="pt-4 text-xs md:text-default">Professionaly Driven Productions</p>
              <p className="pt-4 text-sm md:text-lg font-sans">Thank you, for the drone footage of the Keystone Bridge</p>
            </div>
          </a>
        </div>
      </div>
      <style jsx>{`
        .list {
          @apply text-cool hover:text-bright;
        }
        button, a {
          @apply  hover:text-white text-bright
        }
      `}</style>
    </footer>
  );
};

export default Footer;