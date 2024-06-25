import { onGetWorkflows } from '../_actions/workflow-connections'
import MoreCredits from './more-credits'
import Workflow from './workflow'
import React from 'react'

type Props = {}

const Workflows = async (props: Props) => {
  const workflows = await onGetWorkflows()
  
  return (
    <div className="relative flex flex-col gap-4">
      <section className="flex flex-col gap-4 p-6">
        <MoreCredits />
        {workflows?.length ?
        workflows.map( (flow) => (<Workflow key={flow.id} {...flow}/>) ) :
        <div className="flex item-center justify-center mt-28 text-muted-foreground">No Workflows</div>}
      </section>
    </div>
  )
}

export default Workflows