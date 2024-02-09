import Header from "@/components/header";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "../../../lib/prisma";
import { BookingItem } from "@/components/booking-item";
import { isFuture, isPast } from "date-fns";


export default async function BookingsPage() {

  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return redirect("/")
  }

  // const confirmedBookings = await db.booking.findMany({
  //   where: {
  //     userId: (session.user as any).id,
  //     date: {
  //       gte: new Date()
  //     }
  //   },
  //   include: {
  //     service: true,
  //     barbershop: true
  //   },
  // })

  // const finishedBookings = await db.booking.findMany({
  //   where: {
  //     userId: (session.user as any).id,
  //     date: {
  //       lte: new Date()
  //     }
  //   },
  //   include: {
  //     service: true,
  //     barbershop: true
  //   },
  // })

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          gte: new Date()
        }
      },
      include: {
        service: true,
        barbershop: true
      },
    }),
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lte: new Date()
        }
      },
      include: {
        service: true,
        barbershop: true
      },
    })
  ])

  // const confirmedBookings = bookings.filter((booking) =>isFuture(booking.date))
  // const finishedBookings = bookings.filter((booking) => isPast(booking.date))


  return (
    <div>
      <Header />
      <div className="px-5 py-6">
        <h1 className="text-xl font-bold">Agendamento</h1>

        <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">Confirmados</h2>
        <div className="flex flex-col gap-3">
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
            ))}
        </div>

        <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">Finalizados</h2>
        <div className="flex flex-col gap-3">
          {finishedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
            ))}
        </div>
      </div>
    </div>
  )
}