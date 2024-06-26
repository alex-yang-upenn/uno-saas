'use client';

import React, { useEffect } from 'react'
import { getCookie, deleteCookie } from 'cookies-next'
import { toast } from 'sonner'
import { CONNECTIONS } from '@/lib/constant'
import ConnectionCard from './connection-card'

type Props = {areServicesConnected: any}

const ConnectionsClientWrapper: React.FC<Props> = ({ areServicesConnected } : Props) => {
  useEffect(() => {
    const message = getCookie('errorMessage')
    if (message) {
      deleteCookie('errorMessage')
      toast.message(message)
    }
  }, [])

  return (
    <div className="relative flex flex-col gap-4">
      <section className="flex flex-col gap-4 p-6 text-muted-foreground">
        Connect all your apps directly from here. You may need to connect
        these apps regularly to refresh verification.
        {CONNECTIONS.map((connection) => (
          <ConnectionCard key={connection.title} description={connection.description} icon={connection.image} title={connection.title} type={connection.title} connected={areServicesConnected}/>
        ))}
      </section>
    </div>
  )
}

export default ConnectionsClientWrapper