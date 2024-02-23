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
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadCloud } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
    phone: z.string().min(10).max(14).optional(),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(2).max(50),
    confirmPassword: z.string().min(2).max(50),
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
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
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
        <DrawerTitle className="uppercase">Adicionar menbro</DrawerTitle>
        <DrawerDescription>
          Aqui voce pode cadastrar um novo menbro de equipe.
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
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Barba" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      type="phone"
                      placeholder="(00) 00000-0000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="contato@contato.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirmar Senha"
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
