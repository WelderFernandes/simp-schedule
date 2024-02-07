"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, MapPin, MenuIcon, Star } from "lucide-react"
import { db } from "../../../../../lib/prisma"
import Image from "next/image"
import { Barbershop } from '@prisma/client';
import { useRouter } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideMenu } from "@/components/side-menu"


interface BarbershopInfoProps {
  Barbershop: Barbershop
}
export function BarbershopInfo({Barbershop}: BarbershopInfoProps) {

  const router = useRouter()

  function handleBackClick() {
    return router.replace('/')
  }

  return (
    <div>
    <div className="h-[250px] w-full relative">
      <Button onClick={() => handleBackClick()} variant="outline" size="icon" className="absolute top-4 left-4 z-10">
        <ChevronLeft size={20} />
      </Button>
      <Sheet>
          <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="absolute top-4 right-4 z-10">
            <MenuIcon size={20} />
          </Button>
          </SheetTrigger>
          <SheetContent className="p-0 ">
            <SideMenu />
          </SheetContent>
      </Sheet>
      <Image
        src={Barbershop.imageUrl} 
        alt={Barbershop.name} 
        fill 
        className="object-cover opacity-75"
      />

    </div>
    <div className="flex flex-col px-5 pt-3 pb-6 border-b border-solid border-secondary gap-2">
      <h1 className="text-xl font-bold">{Barbershop.name}</h1>
      <div className="flex itens-center gap-2">
        <MapPin size={16} className="fill-primary text-secondary"/>
        <p className="text-sm">{Barbershop.address}</p>
      </div>
      <div className="flex itens-center gap-1">
        <Star size={16} className="fill-primary text-secondary"/>
        <p className="text-sm">{Barbershop.address}</p>
      </div>
    </div>
  </div>
  )
}