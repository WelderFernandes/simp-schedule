"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Barbershop } from "@prisma/client";
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface BarbeshopItemProps {
  barbershop: Barbershop;
}

export function BarbershopItem({ barbershop }: BarbeshopItemProps) {

  const router = useRouter()

  function handleBookingClick() {
    router.push(`/barbershops/${barbershop.id}`)
  }

  return (
    <Card className="min-w-[167px] max-w-[167px] rounded-2xl w-full">
      <CardContent className="px-1 py-0">
        <div className="relative h-[159px] w-full">
          <div className="absolute top-2 left-2 z-50">
            <Badge variant="secondary" className="flex items-center gap-1 opacity-90">
              <StarIcon size={12} className="fill-yellow-500 text-yellow-500" />
              <span className="text-xs">5.0</span>
            </Badge>
          </div>

          <Image 
            src={barbershop.imageUrl} 
            alt={barbershop.name} 
            width={0} 
            height={0}
            fill
            sizes="100vw"
            className="rounded-2xl object-cover"
          />
        </div>
      <div className="px-3 pb-3">
        <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">{barbershop.name}</h2>
          <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">{barbershop.address}</p>

        <Button variant="secondary" className="w-full mt-3" onClick={() => handleBookingClick()}>
          Reservar
        </Button>
      </div>
      </CardContent>
    </Card>
  )
}