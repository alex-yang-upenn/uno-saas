
import { getGoogleListener } from '../../../_actions/workflow-connections'
import { toast } from 'sonner'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CardContainer } from '@/components/global/3d-card'
import { Card, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import LoadingSvg from './loading-svg'

type Props = {}

const GoogleDriveFiles = (props: Props) => {
  const [loading, setLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [listenerId, setListenerId] = useState<string | null>(null);
  
  const reqGoogle = async () => {
    setLoading(true)
    const response = await axios.get('/api/drive-activity')
    if (response) {
      toast.message(response.data)
      setLoading(false)
      onListener()
    } else {
      setIsListening(false)
    }
  }
  
  const onListener = async () => {
    const listener = await getGoogleListener()
    if (listener) {
      setListenerId(listener.googleResourceId)
      if (listener.googleResourceId !== null) {
        setIsListening(true) 
      } else {
        setIsListening(false)
      }
    } else {
      setIsListening(false)
    }
  }
  useEffect(() => {onListener()})

  return (
    <div className="flex flex-col gap-3 pt-3">
      <Button variant="outline" {...(!loading && {onClick: reqGoogle})}>
        {loading ? (<LoadingSvg/>) : isListening ? ("Refresh Listener") : ("Create Listener") }
      </Button>
      {isListening 
      ? (<Card className="py-3">
        <CardContainer className="py-2">
          <CardDescription>Listening...</CardDescription>
        </CardContainer>
        <CardContainer className="py-2">
        <CardDescription>Listener ID: {listenerId}</CardDescription>
        </CardContainer>        
      </Card>) 
      : (<Card className="py-3">
        <CardContainer className="py-2">
          <CardDescription>No Listener active</CardDescription>
        </CardContainer>
        <CardContainer className="py-2">
          <CardDescription>Please create a Listener</CardDescription>
        </CardContainer>
      </Card>)
      }
    </div>
  )
}

export default GoogleDriveFiles

