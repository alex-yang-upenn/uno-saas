'use client'

import { useBilling } from '@/providers/billing-provider'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import React from 'react'

type Props = {}

const MoreCredits = (props: Props) => {
  const { credits } = useBilling()
  return credits !== "0" 
  ? (<></>) 
  : (<Card>
      <CardContent className="p-6">
        <CardDescription>You are out of credits</CardDescription>
      </CardContent>
    </Card>)
}

export default MoreCredits