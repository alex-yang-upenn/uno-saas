import ContentBasedOnTitle from './content-based-on-title'
import { ConnectionProviderProps } from '@/providers/connections-provider'
import { EditorState } from '@/providers/editor-provider'
import { useUnoStore } from '@/store'
import React from 'react'

type Props = {state: EditorState, nodeConnection: ConnectionProviderProps}

const RenderOutputAccordion = ({ state, nodeConnection }: Props) => {
  const { googleFile, setGoogleFile, selectedSlackChannels, setSelectedSlackChannels } = useUnoStore()

  return (
    <ContentBasedOnTitle nodeConnection={nodeConnection} newState={state} file={googleFile} setFile={setGoogleFile} selectedSlackChannels={selectedSlackChannels} setSelectedSlackChannels={setSelectedSlackChannels}/>
  )
}

export default RenderOutputAccordion