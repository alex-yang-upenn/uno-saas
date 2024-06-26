import ClientSwitch from './client-switch'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import Image from 'next/image'

import React from 'react'

type Props = {name: string, description: string, id: string, publish: boolean | null}

const Workflow = ({ name, description, id, publish }: Props) => {
  return (
    <Card className="flex w-full item-center justify-between">
      <CardHeader className="flex flex-col gap-4">
      <Link href={`/workflows/editor/${id}`}>
          <div className="flex flex-row gap-2">
            <Image src="/googleDrive.png" alt="Google Drive" height={30} width={30} className="object-contain"/>
            <Image src="/notion.png" alt="Google Drive" height={30} width={30} className="object-contain"/>
            <Image src="/discord.png" alt="Google Drive" height={30} width={30}className="object-contain"/>
          </div>
          <div className="">
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </Link>
      </CardHeader>
      <div className="flex flex-col item-center gap-2 p-4">
        <Label htmlFor="airplane-mode" className="text-muted-foreground">
          {publish! ? "On" : "Off"}
        </Label>
        <ClientSwitch id={id} publish={publish!}/>
      </div>
    </Card>
  )
}

export default Workflow