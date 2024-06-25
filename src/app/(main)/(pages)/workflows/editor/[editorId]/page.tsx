import EditorProvider from '@/providers/editor-provider'
import ConnectionsProvider  from '@/providers/connections-provider'
import EditorCanvas from './_components/editor-canvas'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
  return (
    <div className="h-full">
      <EditorProvider>
        <ConnectionsProvider>
          <EditorCanvas />
        </ConnectionsProvider>
      </EditorProvider>
    </div>
  )
}

export default Page