import Header from "@/components/header";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Search from "./components/seach";
import { BookingItem } from "@/components/booking-item";
import { BarbershopItem } from "./components/barbershop-item";
import { db } from "../../../lib/prisma";
import { Footer } from "@/components/footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {

  // const barbershop = await db.barbershop.findMany()
  const session = await getServerSession(authOptions)

  const [barbershop, bookings] = await Promise.all([
    db.barbershop.findMany(),
    session?.user ? await db.booking.findMany({
      where: {
        userId: (session?.user as any).id,
        date: {
          gte: new Date()
        }
      },
      include: {
        service: true,
        barbershop: true
      },
    }): Promise.resolve([])
  ])

  // const bookings = session?.user ? await db.booking.findMany({
  //   where: {
  //     userId: (session?.user as any).id,
  //     date: {
  //       gte: new Date()
  //     }
  //   },
  //   include: {
  //     service: true,
  //     barbershop: true
  //   },
  // }): undefined

  return (
    <main className="">
     <Header />
      <div className="px-5 pt-5 flex gap-1 flex-col">
        <h2 className="text-xl font-bold">Olá Welder!</h2>
        <p className="text-sm capitalize">
          {format(new Date(), "EEEE',' dd 'de' MMMM", { 
            locale: ptBR
          })}</p>
      </div>

      <div className="px-5 pt-6 flex gap-1 flex-col">
        <Search />
      </div>
      <div className="pt-6">
        <h2 className="text-xs px-5 uppercase text-gray-400 font-bold mb-3">Agendamentos</h2>

        <div className="flex px-5 gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:pt-2">
          {bookings?.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
            ))}
        </div>
        
      </div>

      <div className="mt-6 ">
        <h2 className="px-5 text-xs uppercase text-gray-400 font-bold mb-3">Recomendados</h2>
        
        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:pt-2">
          {barbershop.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <div className="mt-6 mb-[4.5rem]">
        <h2 className="px-5 text-xs uppercase text-gray-400 font-bold mb-3">Populares</h2>
        
        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:pt-2">
          {barbershop.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

    </main>
  );
}
