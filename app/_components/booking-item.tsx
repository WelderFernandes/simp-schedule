'use client'

import { Prisma } from '@prisma/client'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import Image from 'next/image'
import { Button } from './ui/button'
import { cancelBooking } from '../_actions/cancel-booking'
import { toast } from 'sonner'
import { useRef, useState } from 'react'
import { Loader2, MessageCircle } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import BookingInfo from './booking-info'
import { Input } from './ui/input'
import Link from 'next/link'

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true
      barbershop: true
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const isBookingConfirmed = isFuture(booking.date)

  const handleCopyToClipboard = () => {
    // Verifica se o inputRef está definido
    console.log({ inputRef })
    if (inputRef.current) {
      // Seleciona o texto no input
      inputRef.current.select()
      // Copia o texto para a área de transferência
      document.execCommand('copy')
      // Desseleciona o texto
      window.getSelection()?.removeAllRanges()
      // Opcional: Exibe uma mensagem ou lógica adicional
      alert('Texto copiado para a área de transferência!')
    }
  }

  const handleCancelClick = async () => {
    setIsDeleteLoading(true)

    try {
      await cancelBooking(booking.id)

      toast.success('Reserva cancelada com sucesso!')
    } catch (error) {
      console.error(error)
    } finally {
      setIsDeleteLoading(false)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-full ">
          <CardContent className="py-0 flex px-0 ">
            <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
              <Badge
                variant={isBookingConfirmed ? 'default' : 'secondary'}
                className="w-fit"
              >
                {isBookingConfirmed ? 'Confirmado' : 'Finalizado'}
              </Badge>
              <h2 className="font-bold">{booking.service.name}</h2>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.barbershop.imageUrl} />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>

                <h3 className="text-sm">{booking.barbershop.name}</h3>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 border-l border-solid border-secondary">
              <p className="text-sm capitalize">
                {format(booking.date, 'MMMM', {
                  locale: ptBR,
                })}
              </p>
              <p className="text-2xl">{format(booking.date, 'dd')}</p>
              <p className="text-sm">{format(booking.date, 'hh:mm')}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="px-0 overflow-y-scroll">
        <SheetHeader className="px-5 text-left pb-6 border-b border-solid border-secondary">
          <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="px-5">
          <div className="relative h-[180px] w-full mt-6">
            <Image
              src="/barbershop-map.png"
              fill
              alt={booking.barbershop.name}
            />

            <div className="w-full absolute bottom-4 left-0 px-5">
              <Card>
                <CardContent className="p-3 flex gap-2">
                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl} />
                  </Avatar>

                  <div>
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">
                      {booking.barbershop.address}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge
            variant={isBookingConfirmed ? 'outline' : 'secondary'}
            className="w-fit my-3 bg-orange-200/50 text-white"
          >
            {isBookingConfirmed ? 'Pendente' : 'Finalizado'}
          </Badge>

          <BookingInfo booking={booking} />
          <Badge
            variant="secondary"
            className="w-fit mt-6 bg-green-500/80 text-white"
          >
            PIX
          </Badge>
          <Card className="mt-6">
            <CardContent className="p-3">
              <h3 className="font-bold">
                Copie o pix abaixo e faça o pagamento
              </h3>
              <div className="flex flex-col my-6 bg-gray-800 p-4 rounded-md  mx-auto">
                <Input
                  ref={inputRef}
                  className="flex-1 text-white bg-transparent border-none flex-wrap max-w-[300px] overflow-hidden text-ellipsis"
                  readOnly
                  value="0b83fa1b-35fd-4d12-a2ce-bef34acbe671 bef34acbe671 bef34acbe671"
                />
              </div>
              <Button
                className="mb-2 w-full"
                variant="outline"
                onClick={handleCopyToClipboard}
              >
                Copiar
              </Button>
              <h2 className="text-gray-400">
                Depós de realizar o pagamento, envie o comprovante no botão
                abaixo
              </h2>
              <h2 className="text-gray-400 py-6">
                Após a confirmação de pagamento, a reserva será confirmada
              </h2>
            </CardContent>
          </Card>
          <Link
            href={`https://api.whatsapp.com/send?phone=123456789&text=Olá,%0A%${booking.id}`}
          >
            <Button
              className="w-full bg-green-400/80 mt-6 flex gap-2 justify-center"
              variant="secondary"
            >
              <MessageCircle className="inline" size={18} />
              Enviar comprovante
            </Button>
          </Link>
          <SheetFooter className="flex-row gap-3 mt-6">
            <SheetClose asChild>
              <Button className="w-full" variant="secondary">
                Voltar
              </Button>
            </SheetClose>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  disabled={!isBookingConfirmed || isDeleteLoading}
                  className="w-full"
                  variant="destructive"
                >
                  Cancelar Reserva
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[90%]">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Deseja mesmo cancelar essa reserva?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Uma vez cancelada, não será possível reverter essa ação.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-row gap-3">
                  <AlertDialogCancel className="w-full mt-0">
                    Voltar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isDeleteLoading}
                    className="w-full"
                    onClick={handleCancelClick}
                  >
                    {isDeleteLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Confirmar
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

export default BookingItem
