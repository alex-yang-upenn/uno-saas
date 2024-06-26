'use client'

import { ModeToggle } from '../global/mode-toggle'
import Templates from '../icons/cloud_download'
import { onPaymentDetails } from '@/app/(main)/(pages)/billing/_actions/payment-connections'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip'
import { Book, Headphones, Search } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { useBilling } from '@/providers/billing-provider'
import React, { useEffect } from 'react'

type Props = {}

const InfoBar = (props: Props) => {
  const { credits, tier, setCredits, setTier } = useBilling()

  const onGetPayment = async () => {
    const response = await onPaymentDetails()
    if (response) {
      setTier(response.tier!)
      setCredits(response.credits!)
    }
  }
  useEffect(() => {onGetPayment()}, [])

  return (
    <div className="flex flex-row justify-end gap-6 items-center px-4 py-4 w-full dark:bg-black">
      <span className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200">
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">Credits</p>
        {tier == "Unlimited" ? (
          <span>Unlimited</span>
        ) : (
          <span>{credits}/{tier == "Free" ? "10" : tier == "Pro" && "100"}</span>
        )}
      </span>
      <span className="flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-4">
        <Search className="text-gray-500 dark:text-gray-400" />
        <Input 
          placeholder="Quick Search" 
          className="border-none bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
        />
      </span>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <Headphones className="text-gray-800 dark:text-gray-200" />
          </TooltipTrigger>
          <TooltipContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            <p>Contact Support</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <Book className="text-gray-800 dark:text-gray-200" />
          </TooltipTrigger>
          <TooltipContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            <p>Guide</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UserButton></UserButton>
    </div>
  )
}

export default InfoBar