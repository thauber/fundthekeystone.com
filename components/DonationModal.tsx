// DonationModal.tsx
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51NiJW6GIFFRbCQHhDqjsI1dtXL02qqatXojmltdvleQb7v8lNonbEKqAULgVuuVkFRqdXYb5ftVTjrvw525ObKG4000vdXY7q2');


import React, { useState } from "react";

interface DonationModalProps {
  onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ onClose }) => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };

  return (
      <CheckoutForm />
    </Elements>
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleAmountChange = (amount: number) => {
    setAmount(amount);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // You should handle the donation form submission here.
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg space-y-4">
        <h2 className="text-2xl font-display mb-2">Make a Donation</h2>
        {/* Replace src with your image path */}
        <img className="my-4" src="/path/to/your/image.jpg" alt="Bridge" />
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
          className="mb-4 px-2 py-1 border-2 border-blue-500 rounded-lg w-full"
          required
        />
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          className="mb-4 px-2 py-1 border-2 border-blue-500 rounded-lg w-full"
          required
        />
        <div className="flex justify-around">
          {[5, 10, 25, 50, 100, 500].map(value => (
            <button key={value} type="button" onClick={() => handleAmountChange(value)} className="px-2 py-1 bg-green-600 text-white rounded-lg">
              ${value}
            </button>
          ))}
        </div>
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg w-full mt-4">Donate ${amount}</button>
      </form>
    </div>
  );
};

export default DonationModal;
