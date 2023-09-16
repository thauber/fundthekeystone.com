import { ChevronDownIcon } from "@heroicons/react/solid"
import React, { Ref, useCallback, useRef, useState } from "react"

type Props = {
  initialValue: number
  onChange: (value:number) => void
  className?: string
}

const AmountInput = ({initialValue, onChange, className}:Props) => {
  const [showOptions, setShowOptions] = useState(false)
  const [currentValue, setValue] = useState(initialValue)
  const [customVisible, setCustomVisible] = useState(false);
  const customInput = useRef<HTMLInputElement>(null)
  const customMobileInput = useRef<HTMLInputElement>(null)
  const toggleOptions = ()=>{
    setCustomVisible(false)
    setShowOptions(!showOptions)
  }

  const handleChange = (value:string|undefined)=> {
    if (value) {
      const intValue = parseInt(value)
      if (intValue) {
        updateValue(intValue);
      }
    }
  }
  
  const updateValue = useCallback((value:number) => {
    setValue(value)
    setShowOptions(false)
    onChange(value)
  }, [setValue, setShowOptions, onChange])

  const focusMobile = () => {
    if (!customVisible && customMobileInput.current) {
      if (currentValue) {
        customMobileInput.current.value = ""+currentValue
      }
      setTimeout(() => {
        if (customMobileInput.current) {
          customMobileInput.current.focus()
        }
      }, 100)
    } else {
      if (customMobileInput.current) {
        customMobileInput.current.value = ""
      }
    }
    setShowOptions(false)
    setCustomVisible(!customVisible)
  }

  return (
    <>
      <div className={`hidden md:grid grid-cols-10 gap-x-2 ${className||""}`}>
        {[10, 20, 100, 500].map((value, i) => (
          <button
            type="button"
            key={value}
            onClick={() => currentValue === value ? updateValue(0) : updateValue(value)}
            className={`amount tempt col-span-2 ${currentValue === value ? 'selected' : ''} ${customVisible ? 'hidden' : ''}`}
          >
            {`$${value}`}
          </button>
        ))}
        <input
          ref={customInput}
          type="text"
          className={`col-start-0 col-span-8 col-end-9 mr-2 ${customVisible ? "" : "hidden"}`}
          placeholder="Custom amount" onChange={()=>handleChange(customInput.current?.value)}
        />
        <button
          type="button"
          className={`other col-span-2 tempt border-2 border-bright p-4`}
          onClick={() => {
            if (!customVisible) {
              setTimeout(() => {
                customInput.current?.focus()
              }, 100)
            } else {
              updateValue(0)
              if (customInput.current) {
                customInput.current.value = ""
              }
            }
            setCustomVisible(!customVisible)
          }}
        >
          {customVisible ? 'Back' : 'Other'}
        </button>
      </div>
      <div className="single md:hidden relative col-span-10 grid grid-cols-10">
        <div className={`grid grid-cols-10 col-span-10 ${customVisible ? "" : "hidden"}`}>
          <input
            ref={customMobileInput}
            type="text"
            className={`col-span-8 mr-2`}
            placeholder="Custom amount"
            onChange={()=>handleChange(customMobileInput.current?.value)}
          />
          <button type="button" onClick={toggleOptions} className="h-15 col-span-2 border-l-0 flex items-center justify-center border-2 border-bright"><ChevronDownIcon className="w-10" /></button>
        </div>
        <button type="button" onClick={toggleOptions} className={`amount tempt ${currentValue ? "text-bright-dark bg-bright-lighter " : ""} ${customVisible ? "hidden" : ""}`}>
          {currentValue ? `$${currentValue}` : "Choose Amount"}
        </button>
        {showOptions && (
        <>
          <div className="popunder" onClick={()=>setShowOptions(false)}/>
          <div className="popover">
            <div className="py-1 flex flex-col">
              {[10, 20, 100, 500].map((value, i) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => updateValue(value)}
                  className={`option ${currentValue === value ? 'selected' : ''} ${customVisible ? 'hidden' : ''}`}
                >
                  {`$${value}`}
                </button>
              ))}
              <button
                type="button"
                className={`other col-span-2 tempt p-4`}
                onClick={focusMobile}
              >
                Other
              </button>
            </div>
          </div>
        </>
        )}
      </div>
      <style jsx>{`
        .single .amount {
          @apply text-left col-span-10 p-4 border-bright border-2 items-center;
        }
        .amount {
          @apply uppercase font-brand font-black hover:font-display border-2 border-bright p-4;
          letter-spacing: .3rem;
        }
        .option {
          @apply h-16 border-b-2 hover:bg-slate-200;
        }
        .popunder {
          @apply fixed inset-0 z-10 bg-black bg-opacity-50;
        }
        .popover {
          @apply z-20 origin-top-left w-full absolute left-0 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 border-bright;
        }
        button.selected {
          @apply font-display bg-bright-lighter text-bright-dark;
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
    </>
  )
}
export default AmountInput