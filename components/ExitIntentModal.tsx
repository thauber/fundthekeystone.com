// ExitIntentModal.tsx

import React, { useState } from "react";

interface ExitIntentModalProps {
    onClose: () => void;
}

const ExitIntentModal: React.FC<ExitIntentModalProps> = ({ onClose }) => {
    const [email, setEmail] = useState("");

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // You should handle the email submission here.
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg space-y-4">
                <h2 className="text-2xl font-display mb-2">Don&apos;t Leave Yet! We Need Your Help!</h2>
                <p className="text-xl font-roboto">Stay up to date and involved by joining our mailing list.</p>
                <input 
                    type="email" 
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    className="mb-4 px-2 py-1 border-2 border-blue-500 rounded-lg w-full"
                    required
                />
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg w-full mt-4">Join</button>
            </form>
        </div>
    );
};

export default ExitIntentModal;
