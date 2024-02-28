'use client'
import { Button } from '@/app/_components/ui/button'
import { Drawer, DrawerTrigger } from '@/app/_components/ui/drawer'
import { Separator } from '@/app/_components/ui/separator'

// import { db } from '@/app/_lib/prisma'
import { ArrowLeft, PlusIcon } from 'lucide-react'
import { ServiceDrawn } from './_component/team-drawn'
import { useRouter } from 'next/navigation'
// import { TeamCard } from './_component/team-card'

export default function TeamPage() {
  const route = useRouter()
  // const [user] = await Promise.all([
  //   db.user.findMany({
  //     include: {
  //       Barbershop: true,
  //     },
  //   }),
  // ])

  return (
    <div className="flex flex-col w-full ">
      <div className="py-4 px-5">
        <Button variant="outline" size={'icon'} onClick={() => route.back()}>
          <ArrowLeft size={18} />
        </Button>
      </div>
      <div className="py-4 px-6">
        <div className="flex justify-between">
          <div className="w-56">
            <h1 className="text-gray-300 font-bold text-2xl">Equipe</h1>
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
            <ServiceDrawn />
          </Drawer>
        </div>
        <Separator className="my-6" />
        <div className="w-full h-full flex flex-col gap-3">
          {/* {user.map((user) => (
            <TeamCard key={user.id} team={user} />
          ))} */}
        </div>
      </div>
    </div>
  )
}
