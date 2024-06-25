'use client'

import LoadingSvg from './loading-svg'
import FlowInstance from './flow-instance'
import EditorCanvasCardSingle from './editor-canvas-card-single'
import EditorCanvasSidebar from './editor-canvas-sidebar'
import { onGetNodesEdges } from '../../../_actions/workflow-connections'
import { useEditor } from '@/providers/editor-provider'
import { EditorCanvasCardType, EditorNodeType } from '@/lib/types'
import { EditorCanvasDefaultCardTypes } from '@/lib/constant'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { toast } from 'sonner'
import ReactFlow, { Background, Connection, Controls, Edge, EdgeChange, MiniMap, NodeChange, ReactFlowInstance, addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow'
import 'reactflow/dist/style.css'
import { usePathname } from 'next/navigation'
import { v4 } from 'uuid'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

type Props = {}

const initialNodes: EditorNodeType[] = []

const intialEdges: { id: string, source: string, target: string }[] = []

const EditorCanvas = (props: Props) => {
  const { state, dispatch } = useEditor()
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(intialEdges)
  const [isWorkFlowLoading, setIsWorkFlowLoading] = useState<boolean>(false)
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>()
  const pathName = usePathname()
  
  const nodeTypes = useMemo(
    () => ({
      Action: EditorCanvasCardSingle,
      Trigger: EditorCanvasCardSingle,
      Email: EditorCanvasCardSingle,
      Condition: EditorCanvasCardSingle,
      AI: EditorCanvasCardSingle,
      Slack: EditorCanvasCardSingle,
      "Google Drive": EditorCanvasCardSingle,
      Notion: EditorCanvasCardSingle,
      Discord: EditorCanvasCardSingle,
      "Custom Webhook": EditorCanvasCardSingle,
      "Google Calendar": EditorCanvasCardSingle,
      Wait: EditorCanvasCardSingle,
    }),
    []
  )

  useEffect(() => {
    dispatch({ type: "LOAD_DATA", payload: { edges, elements: nodes }})
  }, [nodes, edges])

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault()

      const type: EditorCanvasCardType['type'] = event.dataTransfer.getData('application/reactflow')

      if (typeof type === "undefined" || !type) {
        return
      }

      const triggerAlreadyExists = state.editor.elements.find((node) => node.type === "Trigger")
      if (type === "Trigger" && triggerAlreadyExists) {
        toast('Only one trigger can be added to automations at the moment')
        return
      }

      if (!reactFlowInstance) return
      
      const position = reactFlowInstance.screenToFlowPosition({ x: event.clientX, y: event.clientY })
      const newNode = {
        id: v4(),
        type,
        position,
        data: {
          title: type,
          description: EditorCanvasDefaultCardTypes[type].description,
          completed: false,
          current: false,
          metadata: {},
          type: type,
        },
      }
      //@ts-ignore
      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, state]
  )

  const onDragOver = useCallback((event: any) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    //@ts-ignore
    setNodes((nds) => applyNodeChanges(changes, nds))
  }, [setNodes])

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      //@ts-ignore
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  )

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [])
  
  const handleClickCanvas = () => {
    dispatch({
      type: "SELECTED_ELEMENT",
      payload: {
        element: {
          data: {completed: false, current: false, description: "", metadata: {}, title: "", type: "Trigger"},
          id: "",
          position: { x: 0, y: 0 },
          type: "Trigger",
        },
      },
    })
  }

  const onGetWorkFlow = async () => {
    setIsWorkFlowLoading(true)
    const response = await onGetNodesEdges(pathName.split('/').pop()!)
    if (response) {
      setEdges(JSON.parse(response.edges!))
      setNodes(JSON.parse(response.nodes!))
      setIsWorkFlowLoading(false)
    }
    setIsWorkFlowLoading(false)
  }

  useEffect(() => {onGetWorkFlow()}, [])

  return (
    <ResizablePanelGroup direction="horizontal" className="">
      <ResizablePanel defaultSize={70}>
        <div className="flex h-full item-center justify-center">
          <div style={{ width: '100%', height: '100%', paddingBottom: '70px' }} className="relative">
            {isWorkFlowLoading ? (<LoadingSvg />) : ( 
              <ReactFlow
                className="w-[300px]"
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodes={state.editor.elements}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                fitView
                onClick={handleClickCanvas}
                nodeTypes={nodeTypes}
              >
                <Controls position="top-left"/>
                <MiniMap position="bottom-left" className="!bg-background" zoomable pannable/>
                <Background
                  //@ts-ignore 
                  variant="dots" gap={12} size={1}/>
              </ReactFlow>
              )
            }
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={40} className="relative sm:block">
        {isWorkFlowLoading ? (<LoadingSvg />) : (
          <FlowInstance edges={edges} nodes={nodes}>
            <EditorCanvasSidebar nodes={nodes}/>
          </FlowInstance>)} 
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default EditorCanvas