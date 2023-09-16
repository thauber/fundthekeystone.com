import { useState } from 'react';
import { GlobeIcon, UserIcon, CheckIcon } from '@heroicons/react/solid';

interface ToggleSubscriptionProps {
  initialValue: boolean;
  onToggle: (value: boolean) => void;
  onHover: (value: boolean) => void;
  className?: string;
}

const ToggleSubscription = ({ initialValue, onToggle, className, onHover } : ToggleSubscriptionProps) => {
  const [isMonthly, setIsMonthly] = useState(initialValue);

  const onChange = () => {
    setIsMonthly(!isMonthly);
    onToggle(!isMonthly);
  }

  return (
    <button
      type="button"
      onClick={onChange}
      onMouseOver={()=>onHover(true)}
      onMouseOut={()=>onHover(false)}
      className={`${className || ""} w-full cursor-pointer text-cool border-2 border-bright py-2 pr-6 ${isMonthly ? "hover:bg-bright-ligher shiny" : "tempt"}`}
    >
      <div className={`container flex`}>
        <div className={`checkbox w-5 h-5 flex flex-col md:flex-row rounded flex-shrink-0 justify-center items-center mr-2 ${isMonthly ? 'checked' : ''}`}>
          {isMonthly && <CheckIcon className="h-5 w-5 text-white" />}
        </div>
        <div className="flex w-full flex-grow flex-col md:flex-row">
          <div className="flex-grow">
            Donate Monthly
          </div>
          {isMonthly
            ? <div className="convert font-sans text-sm uppercase animate-pulseScale origin-left">YOU ROCK!</div>
            : <div className="font-sans text-sm uppercase">Multiply Your Impact</div>
          }
        </div>
      </div>
      <style jsx>{`
        .container {
          @apply text-left flex w-full flex-grow items-center;
        }
        .checkbox {
          @apply ml-4 border-2 border-cool;
        }
        .checkbox.checked {
          @apply bg-bright border-bright;
        }
        .shiny {
          @apply bg-bright-lighter text-bright-dark;
        }
        .convert {
          width: 76px;
        }
      `}
      </style>
    </button>
  )
}
export default ToggleSubscription;