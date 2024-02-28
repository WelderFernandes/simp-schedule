import { Button } from '@/app/_components/ui/button'
import { Card, CardContent } from '@/app/_components/ui/card'
import { Drawer, DrawerTrigger } from '@/app/_components/ui/drawer'
import { Separator } from '@/app/_components/ui/separator'

import { db } from '@/app/_lib/prisma'
import { ArrowLeft, Edit2Icon, PlusIcon } from 'lucide-react'
import Image from 'next/image'
// import { ServiceDrawn } from './_component/team-drawn'

export default async function OpeningHours() {
  const [services] = await Promise.all([db.service.findMany()])

  return (
    <div className="flex flex-col w-full ">
      <div className="py-4 px-5">
        <Button variant="outline" size={'icon'}>
          <ArrowLeft size={18} />
        </Button>
      </div>
      <div className="py-4 px-6">
        <div className="flex justify-between">
          <div className="w-56">
            <h1 className="text-gray-300 font-bold text-2xl">
              Horários abertos
            </h1>
            <p className="text-gray-400 text-sm">
              Envie um concite para o seu time ou adicione novos membros
            </p>
          </div>
          <Drawer dismissible={false}>
            <DrawerTrigger asChild>
              <Button variant="outline" className="gap-3 border-primary">
                <PlusIcon size={18} />
                Adicionar serviço
              </Button>
            </DrawerTrigger>
            {/* <ServiceDrawn /> */}
          </Drawer>
        </div>
        <Separator className="my-6" />
        <div className="w-full h-full flex flex-col gap-3">
          {services.map((service) => (
            <Card key={service.id}>
              <CardContent className="p-3 w-full">
                <div className="flex gap-4 items-center w-full">
                  <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
                    <Image
                      className="rounded-lg"
                      src={service.imageUrl}
                      fill
                      style={{ objectFit: 'contain' }}
                      alt={service.name}
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <h2 className="font-bold">{service.name}</h2>
                    <p className="text-sm text-gray-400">
                      {service.description}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <p className="text-primary text-sm font-bold">
                        {Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(Number(service.price))}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    className="rounded-full"
                    size="sm"
                  >
                    <Edit2Icon size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
