"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Service } from "@prisma/client"
import { signIn } from "next-auth/react";
import Image from "next/image"

interface ServiceItemProps {
  service: Service;
  isAuthenticated: boolean;
}

export function ServiceItem({service, isAuthenticated}: ServiceItemProps) {

  

  function handleBookingClick() {
    if (!isAuthenticated) {
      return signIn('google')
    }
  }

  return (
    <Card className="flex gap-1 my-2 mx-5">
      <CardContent className="p-3 w-full">
        <div className="flex gap-4 items-center">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
            <Image
              src={service.imageUrl} 
              alt={service.name} 
              fill
              className="object-contain rounded-lg"
              />
          </div>

          <div className="flex flex-col w-full">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm">{service.description}</p>

            <div className="flex items-center justify-between mt-2">
              <p className="text-primary font-bold">
                {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(Number(service.price.toString()))}
              </p>
              <Button variant="outline" onClick={() => handleBookingClick()}>Reservar</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}