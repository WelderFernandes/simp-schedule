"use client"
import { format, isPast } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Prisma } from '@prisma/client';
import { ptBR } from "date-fns/locale";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import { Loader2, StarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cancelBooking } from "@/app/actions/cancel-booking";
import { toast } from "sonner";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";


interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true,
      barbershop: true
    }
  }>
}

export function BookingItem({ booking }: BookingItemProps) {
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)
  
  async function handleCancelBooking() {
    try {
      setIsDeleteLoading(true)
      await cancelBooking(booking.id)
      toast.success("Reserva cancelada com sucesso")
    } catch (error) {
      console.log(error)
      // toast.error("Erro ao cancelar reserva, tente novamente")
    } finally {
      setIsDeleteLoading(false)
    }
    
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-full">
        <CardContent className="p-5 flex py-0 px-0">
          <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
            <Badge variant={isPast(booking.date) ? "outline" : "secondary"} 
            className={`w-fit ${isPast(booking.date) ? "border-secondary-400 text-gray-400" : "text-green-400"}`}>
              {isPast(booking.date) ? "Finalizado" : "Agendado"}
            </Badge>
            <h2>{booking.service.name}</h2>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={booking.barbershop.imageUrl} />
                <AvatarFallback>W</AvatarFallback>
              </Avatar>
              <h3 className="ml-2">{booking.barbershop.name}</h3>
            </div>
          </div>
          <div className="flex flex-1 flex-col item-center text-center justify-center border-l border-solid border-secondary">
            <p className="text-sm capitalize">
              {format(new Date(booking.date),  "MMMM", { 
                locale: ptBR
              })}
            </p>
            <p className="text-2xl">{format(new Date(booking.date), "dd")}</p>
            <p className="text-sm">{format(new Date(booking.date), "hh:mm")}</p>
          </div>
        </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="p-0">
        <SheetHeader className="px-5 text-left py-6 border-b border-solid border-secondary">
          <SheetTitle>
            Informações da reserva
          </SheetTitle>
        </SheetHeader>
        <div className="px-5">
          <div className="relative h-[180px] w-full mt-6">
            <Image 
              className="object-contain" 
              src="/Barbershop-map.png" 
              fill 
              alt={booking.barbershop.name} 
            />
            <div className="w-full absolute bottom-4 left-0">
              <Card className="mx-5">

                <CardContent className="p-3 flex items-center gap-2">

                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl} />
                    <AvatarFallback>W</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col px-5 text-left">
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <p className="text-xs">{booking.barbershop.address}</p>
                  </div>
                  
                </CardContent>
              </Card>
            </div>
          </div>
          <Badge variant={isPast(booking.date) ? "outline" : "secondary"} 
            className={`w-fit my-3 ${isPast(booking.date) ? "border-secondary-400 text-gray-400" : "text-green-400"}`}>
              {isPast(booking.date) ? "Finalizado" : "Agendado"}
          </Badge>
          <Card>
            <CardContent className="p-3 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h2 className="font-bold">{booking.service.name}</h2>
                <h3 className="font-bold text-sm">
                  {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(Number(booking.service.price.toString()))}
                </h3>
              </div>

                <div className="flex justify-between items-center">
                  <h3 className="text-gray-400">Data</h3>
                  <h4 className="text-sm">{format(booking.date, "dd 'de' MMMM", {locale: ptBR})}</h4>
                </div>

                <div className="flex justify-between items-center">
                  <h3 className="text-gray-400">Horário</h3>
                  <h4 className="text-sm">{format(booking.date, "HH:mm", {locale: ptBR})}</h4>
                </div>
              <div className="flex justify-between items-center">
                  <h3 className="text-gray-400">Barbearia</h3>
                  <h4 className="text-sm">{booking.barbershop.name}</h4>
              </div>

            </CardContent>
          </Card>
          <SheetFooter className="flex-row w-full items-center justify-between gap-3 mt-6">
            <SheetClose asChild>
              <Button
                variant="secondary"
                className="w-full"
              >
                Cancelar
              </Button>
            </SheetClose>

            <AlertDialog >
                <AlertDialogTrigger asChild>
                <Button
                  // 
                  disabled={isPast(booking.date) || isDeleteLoading}
                  variant="destructive"
                  className="w-full"
                >
                  {isDeleteLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : "Cancelar reserva"}

                </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-[90%]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancelar reserva</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja <b>cancelar</b> esta reserva?
                      <p>Uma vez cancelada, esta reserva não pode ser refeita.</p>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex-row gap-4">
                    <AlertDialogCancel className="w-full m-0 bg-secondary hover:bg-secondary/60">
                      Voltar
                    </AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleCancelBooking}
                      disabled={isDeleteLoading} 
                      className="w-full p-0 bg-destructive hover:bg-destructive/60">
                    {isDeleteLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : "Confirmar"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}