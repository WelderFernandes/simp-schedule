"use client"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Barbershop, Booking, Service } from "@prisma/client"
import { ptBR } from "date-fns/locale";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image"
import { useEffect, useMemo, useState } from "react";
import { generateDayTimeList } from "../helpers/hours";
import { addDays, format, setHours, setMinutes } from "date-fns";
import { saveBooking } from "../actions/save-booking";
import { Loader2 } from "lucide-react";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { getDayBooking } from "../actions/get-day-booking";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"



interface ServiceItemProps {
  barbershop: Barbershop;
  service: Service;
  isAuthenticated: boolean;
}

export function ServiceItem({service, isAuthenticated, barbershop}: ServiceItemProps) {
  const {data} = useSession()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [hour, setHour] = useState<string | undefined>()
  const [submitIsLoading, setSubmitIsLoading] = useState(false)
  const [sheetIsOpen, setSheetIsOpen] = useState(false)
  const [dayBookings, setDayBookings] = useState<Booking[] | undefined>()

  const route = useRouter()

  console.log({dayBookings})

  useEffect(() => {
    if (!date) {
      return
    }
    const refreshAvaliableHours = async () => {
      const _dayBookings = await getDayBooking(barbershop.id, date)
      setDayBookings(_dayBookings)
    }

    refreshAvaliableHours()
  }, [date, barbershop.id])
  
  function handleCalendarChange(date: Date | undefined) {
    setDate(date);
    setHour(undefined);
  }

  function handleBookingClick() {
    // if (!isAuthenticated) {
    //   return signIn('google')
    // }
  }

  async function handleBookingConfirmClick() {
    setSubmitIsLoading(true)
    try {
      if (!date || !hour || !data?.user) {
        return
      }

      const dateHour = Number(hour.split(":")[0])
      const dateMinutes = Number(hour.split(":")[1])

      const newDate = setMinutes(setHours(date, dateHour), dateMinutes)

     await saveBooking({
        serviceId: service.id,
        barbershopId: barbershop.id,
        userId: (data.user as any).id,
        date: newDate
      })
      setDate(undefined)
      setHour(undefined)
      toast("Reserva realizada com sucesso", {
        description: format(newDate, "'Para' dd 'de' MMMM 'às' HH:mm", { locale: ptBR }),
        action: {
          label: "Visualizar",
          onClick: () => route.push("/bookings"),
        },
      })
      
    } catch (error) {
      console.log({error})
    }

    setSubmitIsLoading(false)
    
    setSheetIsOpen(false)
  }


 const timeList = useMemo(() => {
  if (!date) {
    return []
  }

  return generateDayTimeList(date || new Date()).filter((time) => {
    const timeHour = Number(time.split(":")[0])
    const timeMinutes = Number(time.split(":")[1])

    // Logica para nao mostrar os horarios agendados
    const booking = dayBookings?.find((booking) => {
      const bookingHour = booking.date.getHours()
      const bookingMinutes = booking.date.getMinutes()

      return bookingHour === timeHour && bookingMinutes === timeMinutes
    })

    if (!booking) {
      return true
    }

    return false
  })
 }, [date, dayBookings])

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
              <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                <SheetTrigger asChild> 
                  <Button variant="outline" onClick={() => handleBookingClick()}>
                    Reservar
                  </Button>
               </SheetTrigger>

               <SheetContent className="p-0 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
                <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                  <SheetTitle>
                    Fazer Reserva
                  </SheetTitle>
                </SheetHeader>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleCalendarChange}
                    className="my-6"
                    locale={ptBR}
                    fromDate={addDays(new Date(), 1)}
                    styles={{
                      head_cell: {
                        border: 'none',
                        width: '100%',
                        textTransform: 'capitalize'
                      },
                      cell: {
                        border: 'none',
                        width: '100%'
                      },
                      button: {
                        width: '100%'
                      },
                      nav_button_next: {
                        width: '2rem'
                      },
                      nav_button_previous: {
                        width: '2rem'
                      },
                      caption: {
                        textTransform: 'capitalize'
                      }
                    }}
                  />
                {/* Mostra lista de horários apenas se alguma data estiver selecionada */}
                  {
                    date && (
                      <Carousel className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden text-left px-5 py-6 border-t border-solid border-secondary">
                        <CarouselContent className="flex gap-2 pl-4 mr-8">
                          {timeList.length === 0 ? 'Nenhum horário disponível no dia selecionado' : timeList.map((time) => (
                              <Button key={time}
                                variant={time === hour ? "default" : "outline"}
                                className={
                                  `${time === hour && "border-primary border"}
                                  rounded-full`} 
                                  onClick={() => setHour(time)}
                                  >
                              <CarouselItem className="p-0" >
                                  {time}
                              </CarouselItem>
                              </Button>
                          ))}
                        </CarouselContent>
                        
                        {/* {timeList.map((time) => (
                          <Button
                            key={time}
                            variant={time === hour ? "default" : "outline"}
                            className={
                              `${time === hour && "border-primary border"}
                              rounded-full`} 
                            onClick={() => setHour(time)}
                          >
                            {time}
                          </Button>
                        ))} */}
                      </Carousel>
                    )
                  }
                  <div className="py-6 px-5 border-t border-solid border-secondary">
                    <Card>
                      <CardContent className="p-3 flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <h2 className="font-bold">{service.name}</h2>
                          <h3 className="font-bold text-sm">{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(Number(service.price.toString()))}</h3>
                        </div>
                        {date && (
                          <div className="flex justify-between items-center">
                            <h3 className="text-gray-400">Data</h3>
                            <h4 className="text-sm">{format(date, "dd 'de' MMMM", {locale: ptBR})}</h4>
                          </div>
                        )}
                         {hour && (
                          <div className="flex justify-between items-center">
                            <h3 className="text-gray-400">Horário</h3>
                            <h4 className="text-sm">{hour}</h4>
                          </div>
                        )}
                        <div className="flex justify-between items-center">
                            <h3 className="text-gray-400">Barbearia</h3>
                            <h4 className="text-sm">{barbershop.name}</h4>
                        </div>

                      </CardContent>
                    </Card>
                  </div>
                  <SheetFooter className="flex justify-center px-5">
                    <Button
                      variant="default"
                      disabled={!date || !hour || submitIsLoading}
                      onClick={() => handleBookingConfirmClick()}
                    >
                      {submitIsLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Confirmar reserva
                    </Button>
                  </SheetFooter>
               </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}