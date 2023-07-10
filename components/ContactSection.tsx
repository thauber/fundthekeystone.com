// ContactSection.tsx

import React, { useState } from "react";

const ContactSection: React.FC = () => {
    const [email, setEmail] = useState("");

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // You should handle the email submission here.
    };

    return (
        <section className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-3xl font-rubikMonoOne mb-4">Stay Informed</h3>
            <p className="text-xl font-roboto mb-4">Sign up for our newsletter and get the latest updates on our mission to save the Elkader Keystone Bridge.</p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <input 
                    type="email" 
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    className="mb-4 px-2 py-1 border-2 border-blue-500 rounded-lg"
                />
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg">Subscribe</button>
            </form>
        </section>
    );
};

export default ContactSection;
