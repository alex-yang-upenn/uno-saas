import { postContentToWebHook } from '@/app/(main)/(pages)/connections/_actions/discord-connection'
import { onCreateNodeTemplate } from '../../../_actions/workflow-connections'
import { Button } from '@/components/ui/button'
import { Option } from '@/lib/types'
import { ConnectionProviderProps } from '@/providers/connections-provider'
import { toast } from 'sonner'
import { usePathname } from 'next/navigation'
import React, { useCallback } from 'react'
import { onCreateNewPageInDatabase } from '@/app/(main)/(pages)/connections/_actions/notion-connection'
import { postMessageToSlack } from '@/app/(main)/(pages)/connections/_actions/slack-connection'

type Props = {currentService: string, nodeConnection: ConnectionProviderProps, channels?: Option[], setChannel?: (value: Option[]) => void}

const ActionButton = ({currentService, nodeConnection, channels, setChannel}: Props) => {
  const pathname = usePathname()

  const onSendDiscordMessage = useCallback(async () => {
    const response = await postContentToWebHook(nodeConnection.discordNode.content, nodeConnection.discordNode.webhookURL)
    if (response.message == "success") {
      nodeConnection.setDiscordNode((prev: any) => ({...prev, content: ""}))
    }
  }, [nodeConnection.discordNode])

  const onStoreNotionContent = useCallback(async () => {    
    const response = await onCreateNewPageInDatabase(nodeConnection.notionNode.databaseId, nodeConnection.notionNode.accessToken, nodeConnection.notionNode.content)
    if (response) {
      nodeConnection.setNotionNode((prev: any) => ({...prev, content: ''}))
    }
  }, [nodeConnection.notionNode])

  const onStoreSlackContent = useCallback(async () => {
    const response = await postMessageToSlack(nodeConnection.slackNode.slackAccessToken, channels!, nodeConnection.slackNode.content)
  }, [nodeConnection.slackNode, channels])

  const onCreateLocalNodeTempate = useCallback(async () => {
    if (currentService === 'Discord') {
      const response = await onCreateNodeTemplate(nodeConnection.discordNode.content, currentService, pathname.split('/').pop()!)
      if (response) {
        toast.message(response)
      }
    }
    if (currentService === 'Slack') {
      const response = await onCreateNodeTemplate(nodeConnection.slackNode.content, currentService, pathname.split('/').pop()!, channels, nodeConnection.slackNode.slackAccessToken)
      if (response) {
        toast.message(response)
      }
    }

    if (currentService === 'Notion') {
      const response = await onCreateNodeTemplate(nodeConnection.notionNode.content, currentService, pathname.split('/').pop()!, [], nodeConnection.notionNode.accessToken, nodeConnection.notionNode.databaseId)
      if (response) {
        toast.message(response)
      }
    }
  }, [nodeConnection, channels])

  const renderActionButton = () => {
    switch (currentService) {
      case "Discord":
        return (
          <>
            <Button variant="outline" onClick={onSendDiscordMessage}>
              Test Message
            </Button>
            <Button onClick={onCreateLocalNodeTempate} variant="outline">
              Save Template
            </Button>
          </>
        )

      case "Notion":
        return (
          <>
            <Button variant="outline" onClick={onStoreNotionContent}>
              Test
            </Button>
            <Button onClick={onCreateLocalNodeTempate} variant="outline">
              Save Template
            </Button>
          </>
        )

      case "Slack":
        return (
          <>
            <Button variant="outline" onClick={onStoreSlackContent}>
              Send Message
            </Button>
            <Button onClick={onCreateLocalNodeTempate} variant="outline">
              Save Template
            </Button>
          </>
        )

      default:
        return null
    }
  }
  
  return renderActionButton()
}

export default ActionButton