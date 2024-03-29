'use client'
import { Button } from '@/app/_components/ui/button'
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  // DrawerOverlay,
  // DrawerPortal,
  DrawerTitle,
} from '@/app/_components/ui/drawer'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadCloud } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
// import ReactCrop, { type Crop } from 'react-image-crop'
// import { useState } from 'react'
// import { UploadIcon } from 'lucide-react'
// import Image from 'next/image'

// import { ScrollArea } from '@/app/_components/ui/scroll-area'

export function ServiceDrawn() {
  // const [crop, setCrop] = useState<Crop>()
  const MAX_FILE_SIZE = 500000
  const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
  ]
  const formSchema = z.object({
    name: z.string().min(2).max(50),
    price: z.string().min(2).max(50),
    commission: z.string().min(2).max(50),
    duration: z.string().min(2).max(50),
    image: z
      .any()
      .refine((files) => files?.length === 1, 'Image is required.')
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        `Max file size is 5MB.`,
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        '.jpg, .jpeg, .png and .webp files are accepted.',
      ),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: '',
      commission: '',
      duration: '',
      image: '',
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <DrawerContent className="flex flex-1 max-h-[calc(100vh-60px)] ">
      <DrawerHeader>
        <DrawerTitle>Cadastro de Serviço</DrawerTitle>
        <DrawerDescription>
          Aqui voce pode cadastrar um novo Serviço
        </DrawerDescription>
      </DrawerHeader>
      <div className="px-5 py-6 overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="flex align-middle justify-center flex-1">
                  <FormControl>
                    <div className="flex flex-col gap-1 items-center">
                      <div className="flex items-center justify-center max-w-36 max-h-46 align-middle text-center">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-full py-2 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col items-center justify-center ">
                            <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PNG, JPG, JPEG
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              (MAX. 300x300px)
                            </p>
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            {...field}
                          />
                        </label>
                      </div>
                      <h3 className="font-bold">Foto do Serviço</h3>
                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
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
            />{' '}
            <DrawerFooter className="p-0">
              <Button type="submit">Salvar</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </div>
    </DrawerContent>
  )
}
