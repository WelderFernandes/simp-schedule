import { Button } from '@/app/_components/ui/button'
import { Card, CardContent } from '@/app/_components/ui/card'
import { User } from '@prisma/client'
import { Edit2Icon } from 'lucide-react'
import Image from 'next/image'

interface TeamCardProps {
  team: User
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <Card>
      <CardContent className="p-3 w-full">
        <div className="flex gap-4 items-center w-full">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
            <Image
              className="rounded-lg"
              src={team.image || '/barbershop.jpg'}
              fill
              style={{ objectFit: 'contain' }}
              alt={team.name || 'Barbearia'}
            />
          </div>

          <div className="flex flex-col w-full">
            <h2 className="font-bold">{team.name}</h2>

            <div className="flex items-center justify-between mt-3">
              {/* <p className="text-primary text-sm font-bold">
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(Number(team.price))}
              </p> */}
            </div>
          </div>
          <Button variant="secondary" className="rounded-full" size="sm">
            <Edit2Icon size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
