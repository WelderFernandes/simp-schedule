'use client'

// import SideMenu from '@/app/_components/side-menu'
import { Avatar, AvatarImage } from '@/app/_components/ui/avatar'
// import { Button } from '@/app/_components/ui/button'
import { Card, CardContent } from '@/app/_components/ui/card'
// import { Sheet, SheetContent, SheetTrigger } from '@/app/_components/ui/sheet'
import { Barbershop } from '@prisma/client'
// import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
// import { useRouter } from 'next/navigation'

interface BarbershopInfoProps {
  barbershop: Barbershop
}

const BarbershopHeaderInfo = ({ barbershop }: BarbershopInfoProps) => {
  // const router = useRouter()

  // const handleBackClick = () => {
  //   router.replace('/')
  // }

  return (
    <Card className="relative w-full bg-slate-500">
      <CardContent>
        <Image
          src="/barbershop-map.png"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          fill
          alt={barbershop.name}
        />
      </CardContent>

      <div className="w-full absolute bottom-4 left-0 px-5">
        <Card>
          <CardContent className="p-3 flex gap-2">
            <Avatar>
              <AvatarImage src={barbershop.imageUrl} />
            </Avatar>

            <div>
              <h2 className="font-bold">{barbershop.name}</h2>
              <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">
                {barbershop.address}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>
    </Card>
  )
}

export default BarbershopHeaderInfo
