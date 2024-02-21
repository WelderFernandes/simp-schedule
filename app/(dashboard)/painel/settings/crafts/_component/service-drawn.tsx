'use client'
import { Button } from '@/app/_components/ui/button'
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/app/_components/ui/drawer'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form'
import { Input } from '@/app/_components/ui/input'
import { Textarea } from '@/app/_components/ui/textarea'
import { ScrollArea } from '@/app/_components/ui/scroll-area'

export function ServiceDrawn() {
  const formSchema = z.object({
    name: z.string().min(2).max(50),
    price: z.string().min(2).max(50),
    commission: z.string().min(2).max(50),
    duration: z.string().min(2).max(50),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Cadastro de Serviço</DrawerTitle>
          <DrawerDescription>
            Aqui voce pode cadastrar um novo Serviço
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-[80vh] w-full rounded-md border p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Nome do Serviço</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Barba" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Preço</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="00,00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="commission"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Comissão %</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="00,00 %" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Duração do Serviço</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        min="00:10"
                        max="3:00"
                        placeholder="Duração"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Dica: descreva como e o serviço.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter>
                <Button type="submit">Salvar</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </ScrollArea>
      </div>
    </DrawerContent>
  )
}
