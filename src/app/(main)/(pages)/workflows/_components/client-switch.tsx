'use client'

import { onFlowPublish } from '../editor/[editorId]/_actions/workflow-connections'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import React from 'react'

type Props = {id: string, publish: boolean | null}

const ClientSwitch = ({ id,publish }: Props) => {
  const onPublishFlow = async (checked: boolean) => {
    const response = await onFlowPublish(id, checked)
    if (response) toast.message(response)
  }
  
  return (
    <Switch id="airplane-mode" onCheckedChange={onPublishFlow} defaultChecked={publish!}/>
  )
}

export default ClientSwitch