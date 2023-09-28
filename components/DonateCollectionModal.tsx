// components/DonationModal.tsx

import React, { useCallback, useRef, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js'; import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ConfettiExplosion from 'react-confetti-explosion';
import TogglePrivacyButton from './TogglePrivacyButton';
import ToggleSubscription from './ToggleSubscription';
import AmountInput from './AmountInput';

const DonationSchema = z.object({
  amount: z.coerce.number().min(1, "Can you donate at least $1?"),
  name: z.string().min(1, "What do we call you?"),
  email: z.string().min(1, "How do we reach you?").email("We need a valid email address"),
  monthly: z.boolean(),
  anonymous: z.boolean(),
});

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY||"");

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  session?: string;
  grounded?: boolean;
}

type Donation = z.infer<typeof DonationSchema>;

interface ErrorProps {
  error?: string;
  touched: boolean;
  className?: string;
  submitted?: boolean;
}
const ErrorComponent = ({ error, touched, className, submitted }:ErrorProps) => {
  return (
    <div className={`${className||""} error ${submitted && touched && error?.length ? '_visible' : '_hidden'}`}>
      {error}
      <style jsx>{`
        .error {
          @apply text-red-500 px-4 py-1 text-sm font-sans font-bold border border-red-600 border-t-0 w-full;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease-in-out;
        }

        .error._visible {
          max-height: 100px;
        }

        .error._hidden {
          @apply py-0 border-0;
        }
      `}</style>
    </div>
  );
};

const DonateCollectionModal = ({ isOpen, onClose, session, grounded }:Props) => {
  const [submitted, setSubmitted] = useState(false);
  const [verified, setVerified] = useState(false);
  const [hoverMonthly, setHoverMonthly] = useState(false);
  const submit = () => { setSubmitted(true) }

  if (grounded) { isOpen = true }

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    setFocus,
    formState: { errors, touchedFields, isValid },
  } = useForm<Donation>({
    mode: "all",
    defaultValues: {
      anonymous: false,
      monthly: false,
      name: "",
      email: "",
      amount: 0,
    },
    resolver: zodResolver(DonationSchema),
  });

  const currentAmount = getValues("amount")
  const currentMonthly = getValues("monthly")

  const handleDonate = handleSubmit(async (donation:Donation) => {
    setVerified(true);
    const stripe = await stripePromise;

    // Call your backend to create the Stripe Checkout Session
    const response = await fetch('/api/donate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(donation)
    })

    const session = await response.json();

    if (stripe) {
      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (result.error) {
        console.error(result.error.message);
      }
    }
  });

  if (!isOpen) return null;

  return (
    <div className={`${grounded ? 'mount' : 'modal'}`}>
      {!grounded && <div className="modal-backdrop" onClick={onClose} />}
      {verified && <ConfettiExplosion force={0.5} duration={3000} particleCount={100} />}
      <div className={`content ${grounded ? "" : "modal-content"} ${currentMonthly ? 'monthly' : (hoverMonthly ? 'monthly-hover' : '')}`}>
        <form onSubmit={handleDonate}>
          <h2 className="title">Become a Keystone</h2>
          <div className="amounts grid grid-cols-10 gap-x-2">
            <AmountInput className="col-span-10" initialValue={0} onChange={(value)=>setValue("amount", value, {shouldValidate: true, shouldTouch: true})}/>
            <ErrorComponent className="col-span-10 md:col-span-8 mr-2" error={errors.amount?.message} submitted={submitted} touched={true} />
            <div className="col-span-10 md:col-span-7 flex my-2 items-center">
              <ToggleSubscription initialValue={false} onHover={setHoverMonthly} onToggle={(value)=>{setValue("monthly", value, {shouldValidate: true})}}/>
            </div>
            <div className="col-start-8 col-span-3 flex justify-end mb-2 md:my-2 items-center">
              <TogglePrivacyButton initialValue={false} onToggle={(value)=>{setValue("anonymous", value, {shouldValidate: true})}}/>
            </div>
            <div className="flex items-center flex-col col-span-10 md:col-span-5 mb-2">
              <input
                type="text"
                placeholder="Name"
                {...register("name")}
              />
              <ErrorComponent error={errors.name?.message} touched={!!touchedFields.name} submitted={submitted} />
            </div>
            <div className="flex tems-center flex-col col-span-10 md:col-span-5 mb-2">
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
              />
              <ErrorComponent error={errors.email?.message} touched={!!touchedFields.email} submitted={submitted} />
            </div>

          </div>


          <button
            className={`submit ${ verified ? "submitted" : (isValid ? "valid" : "invalid")}`}
            onClick={()=> {
              submit()
            }}
          >
            Donate
          </button>
          
          <div className="disclaimers">
            <p>
              All proceeds are depositied directly with the <a href="https://elkader-iowa.com" target='blank'>City of Elkader</a> for the <a href="https://elkader-iowa.com/keystone-bridge-update/" target="blank">Keystone Bridge Project</a>
            </p>
            <p>
              All Donations are Tax Deductable
            </p>
          </div>
        </form>
      </div>

      <style jsx>{`
        .disclaimers {
          @apply uppercase p-2 text-slate-400 font-sans;
          font-size: 10px;
        }
        .disclaimers p {
          padding-bottom: 1px;
        }
        .disclaimers a {
          @apply underline;
        }
      .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex; align-items: center;
          justify-content: center;
        }

        .modal {
          @apply text-cool;
          z-index: 50;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .content {
          @apply p-6 py-12 md:p-6;
          z-index: 60;
          max-width: 745px;
          background: white;
        }
        .content.monthly {
          @apply outline outline-bright;
          outline-width: 12px;
        }
        .modal-content {
          width: 92%;
        }
        @media (hover: hover) {
          .modal-content.monthly-hover {
            @apply outline outline-bright-faded;
            outline-width: 12px;
          }
        }
        .title {
          @apply text-screen-lg sm:text-screen-xl md:text-5xl
        }

        .submit {
          @apply bg-cool w-full p-4 text-white text-4xl;
        }
        .invalid {
          @apply border-white border-4;
        }
        .valid {
          @apply border-bright border-4;
        }
        .submitted {
          @apply animate-pulse;
        }

        input[type="text"],input[type="email"] {
          @apply p-6 h-15 w-full border-2 border-bright;
        }
        
        input:placeholder-shown {
          @apply hover:bg-bright-lighter
        }

        input:not(:placeholder-shown) {
          @apply bg-bright-lighter text-bright-dark;
        }

        input:focus {
          @apply bg-white text-cool hover:bg-slate-300;
        }
      `}</style>
    </div>
  );
};

export default DonateCollectionModal;
