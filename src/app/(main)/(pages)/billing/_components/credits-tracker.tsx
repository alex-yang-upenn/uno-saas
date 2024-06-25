import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import React from 'react'

type Props = {credits: number, tier: string}

const CreditTracker = ({ credits, tier }: Props) => {
  return (
    <div className="p-6">
      <Card className="p-6">
        <CardContent className="flex flex-col gap-6">
          <CardTitle className="font-light">Credit Tracker</CardTitle>
          <Progress 
            value={tier == "Free" ? credits * 10 : tier == "Pro" ? credits : tier == 'Unlimited' ? 100 : 0}
            className="w-full"
          />
          <div className="flex justify-end">
            <p>
              {tier == "Free" ? `${credits}/10` : tier == "Pro" ? `${credits}/100` : "Unlimited"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreditTracker