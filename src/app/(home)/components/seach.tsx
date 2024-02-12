"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"



const searchFormSchema = z.object({
  search: z.string({
    required_error: "Campo é obrigatória",
  }).trim()
    .min(3, "Busca deve ter pelo menos 3 letras")
    .max(30, "Busca deve ter no máximo 30 letras"),
})

interface SearchFormProps {
  defaultValue?: z.infer<typeof searchFormSchema>
}


function Search ({ defaultValue }: SearchFormProps) {

  const router = useRouter()

  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: defaultValue ?? {search: ""},
  })

  const handleSubmit = (data: z.infer<typeof searchFormSchema>) => {
    router.push(`/barbershops?search=${data.search}`)
  }

  return (
    <div className="flex items-center gap-2">
      <Form {...form}>
      <form className="flex w-full gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="search"
          render={({field}) => (
            <FormItem className="w-full">
              <FormControl>
                <Input type="text"  placeholder="Busque por um estabelecimento" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="default" size="icon" type="submit">
          <SearchIcon size={20} />
        </Button>
      </form>
      </Form>
    </div>
  )
}

export default Search