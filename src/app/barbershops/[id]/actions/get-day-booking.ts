"use server";
import { endOfDay, startOfDay } from "date-fns"
import { db } from "../../../../../lib/prisma"

export async function getDayBooking(barbershopId: string, date: Date) {
  const bookings = await db.booking.findMany({
    where: {
      barbershopId,
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      }
    }
  })
  return bookings
}
