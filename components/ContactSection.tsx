// ContactSection.tsx

import React, { useState } from "react";
import FacebookIcon from "./icons/Facebook";
import InstagramIcon from "./icons/Instagram";
import Footer from "./Footer";

const ContactSection = ({onDonate}:{onDonate:()=>void}) => {
    const [email, setEmail] = useState("");

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // You should handle the email submission here.
    };

    return (
        <section className="h-screen flex flex-col items-center justify-center p-12 text-center relative">
            <h3 className="text-6xl md:text-9xl text-bright font-display mb-4 w-scrren text-center">Stay Tuned</h3>
            <p className="text-xl md:text-3xl text-white font-roboto mb-4">Keep your eye out for more of the <span className="font-bold text-bright">Fund The Keystone</span> campaign.</p>
            <div className={`z-10 flex flex-col h-16 items-center`}>
                <div className="flex items-center rounded justify-normal m-3 bg-bright border-field border-2 hover:border-white">
                    <button type="button" onClick={onDonate} className="mx-8 my-2 text-3xl transition-all duration-200 ease-in-out text-field cursor-pointer">DONATE</button>
                </div>
                <div className="flex">
                    <a href="https://facebook.com/fundthekeystone" className={`mx-1 transition-all duration-200 ease-in-out cursor-pointer`}><FacebookIcon size={50} /></a>
                    <a href="https://instagram.com/fundthekeystone" className={`mx-1 transition-all duration-200 ease-in-out cursor-pointer`}><InstagramIcon size={50} /></a>
                </div>
            </div>
            <Footer className="md:hidden text-center flex w-full justify-center bottom-0 absolute" />
        </section>
    );
};

export default ContactSection;
