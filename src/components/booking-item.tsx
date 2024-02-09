import { format, isPast } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Prisma } from '@prisma/client';
import { ptBR } from "date-fns/locale";


interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true,
      barbershop: true
    }
  }>
}

export function BookingItem({ booking }: BookingItemProps) {
  return (
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
  )
}