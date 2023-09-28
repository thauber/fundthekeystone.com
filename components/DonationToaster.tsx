import React, { useEffect, useState } from 'react'
import { type One } from 'animal-orm'
import type Donation from '@/animals/Donation'
import useSWR from 'swr'

export default function DonationToaster() {
  const {data:donations, isLoading} = useSWR<One<typeof Donation>[]>('/api/donations')
  const [donationIndex, setDonationIndex] = useState(0)

  useEffect(() => {
    console.log(isLoading, donations, donationIndex)
    if (!isLoading) {
      const timeoutId = setTimeout(() => {
        setDonationIndex(donationIndex + 1)
      }, 1700)
      return ()=>clearTimeout(timeoutId)
    }
  }, [donations, isLoading, donationIndex, setDonationIndex])

  if (isLoading || !donations) return null

  return <div className="absolute top-full flex flex-col w-full">
    {donations.slice(0, donationIndex).reverse().map(donation => (
      <div className={`donation ${donation.isMonthly} border-bright border-2`} key={donation.id}>
        <div>
          <div className="text-cool flex-grow">{donation.payee.name}</div>
          <div className="text-cool flex-grow">donated</div>
        </div>
        <div className="text-field">${donation.amount}</div>
      </div>
    ))}
    <style jsx>{`
      .donation {
        @apply bg-white opacity-90 my-3 text-field p-2 w-full flex;
        top: 100%;
      }
    `}</style>
  </div>
}