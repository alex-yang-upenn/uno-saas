'use client'

import { EditUserProfileSchema } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Loader2 } from "lucide-react"
import { useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'

type Props = {user: any, onUpdate?: any}

const ProfileForm = ({ user, onUpdate }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm<z.infer<typeof EditUserProfileSchema>>({
    mode: "onChange",
    resolver: zodResolver(EditUserProfileSchema),
    defaultValues: {
      name: user.name,
      email: user.email
    }
  })

  const handleSubmit = async (values: z.infer<typeof EditUserProfileSchema>) => {
    setIsLoading(true)
    await onUpdate(values.name)
    setIsLoading(false)
  }

  useEffect(() => {
    form.reset({ name: user.name, email: user.email})
  }, [user])

  return (
    <Form {...form}>
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField disabled={isLoading} control={form.control} name="name" render={({ field } ) => (
          <FormItem>
            <FormLabel className="text-lg">User Full Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Name" />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}>
        </FormField>
        <FormField control={form.control} name="email" render={({ field } ) => (
          <FormItem>
            <FormLabel className="text-lg">User Email</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Email" type="email" disabled={true}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}>
        </FormField>
        <Button type="submit" className="self-start hover:bg-[#2F006B] hover:text-white">
          {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Saving</>) : ("Save user settings") }
        </Button>
      </form>
    </Form>
  )
}

export default ProfileForm