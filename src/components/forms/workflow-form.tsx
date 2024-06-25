import { onCreateWorkflow } from '@/app/(main)/(pages)/workflows/_actions/workflow-connections'
import { WorkflowFormSchema } from '@/lib/types'
import { useModal } from '@/providers/modal-provider'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {title?: string, subtitle?: string}

const WorkflowForm = ({ title, subtitle }: Props) => {
  const { setClose } = useModal()
  
  const form = useForm<z.infer<typeof WorkflowFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(WorkflowFormSchema),
    defaultValues: {name: "", description: ""}
  })
  
  const isLoading = form.formState.isLoading
  
  const router = useRouter()
  const handleSubmit = async (values: z.infer<typeof WorkflowFormSchema>) => {
    const workflow = await onCreateWorkflow(values.name, values.description)
    if (workflow) {
      toast.message(workflow.message)
      router.refresh()
    }
    setClose()
  }
  
  return (
    <Card className="w-full max-w-[650px] border-none">
      {title && subtitle && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
      )}
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4 text-left mt-4" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField disabled={isLoading} control={form.control} name="name" render={({ field } ) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Name" />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}>
            </FormField>
            <FormField disabled={isLoading} control={form.control} name="description" render={({ field } ) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Description"/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}>
            </FormField>
            <Button type="submit" className="mt-4 hover:bg-[#2F006B] hover:text-white">
              {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Saving</>) : ("Save Settings") }
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default WorkflowForm