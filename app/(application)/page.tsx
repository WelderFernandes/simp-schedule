import { format } from 'date-fns'
import Header from '../_components/header'
import { ptBR } from 'date-fns/locale'
import Search from '../_components/search'
import BookingItem from '../_components/booking-item'
import { db } from '../_lib/prisma'
import BarbershopItem from '../_components/barbershop-item'
import { getServerSession } from 'next-auth'
import { authOptions } from '../_lib/auth'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/app/_components/ui/carousel'
import { User } from '@prisma/client'
export default async function Home() {
  const session = await getServerSession(authOptions)

  const [barbershops, recommendedBarbershops, confirmedBookings] =
    await Promise.all([
      db.barbershop.findMany({}),
      db.barbershop.findMany({
        orderBy: {
          id: 'asc',
        },
      }),
      session?.user
        ? db.booking.findMany({
            where: {
              userId: (session.user as User).id,
              date: {
                gte: new Date(),
              },
            },
            include: {
              service: true,
              barbershop: true,
            },
          })
        : Promise.resolve([]),
    ])

  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">
          {session?.user
            ? `Olá, ${session.user.name?.split(' ')[0]}!`
            : 'Olá! Vamos agendar um corte hoje?'}
        </h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>

      <div className="mt-6">
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="pl-5 text-xs mb-3 uppercase text-gray-400 font-bold">
              Agendamentos
            </h2>
            <Carousel className="px-2 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              <CarouselContent className="flex mx-auto">
                {confirmedBookings.map((booking) => (
                  <CarouselItem
                    key={booking.id}
                    className="min-w-[36rem] max-w-[11rem]"
                  >
                    <BookingItem key={booking.id} booking={booking} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </>
        )}
      </div>

      <div className="mt-6 flex flex-col">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">
          Recomendados
        </h2>
        {/* <div className="px-5 grid gap-4 grid-cols-3 grid-rows-3">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="min-w-[11rem] max-w-[11rem]">
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            </div>
          ))}
        </div> */}
        <Carousel spellCheck="true">
          <CarouselContent className="flex mx-auto">
            {barbershops.map((barbershop) => (
              <CarouselItem
                key={barbershop.id}
                className="min-w-[11rem] max-w-[11rem]"
              >
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/* <Button variant="secondary" className="mt-6 mx-auto">
          Ver todos
        </Button> */}
      </div>

      <div className="mt-6 mb-[4.5rem]">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">
          Populares
        </h2>

        <Carousel>
          <CarouselContent className="mx-auto">
            {recommendedBarbershops.map((barbershop) => (
              <CarouselItem
                key={barbershop.id}
                className="min-w-[11rem] max-w-[11rem]"
              >
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}
