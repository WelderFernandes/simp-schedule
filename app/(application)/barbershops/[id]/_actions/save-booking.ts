'use server'
import { db } from '@/app/_lib/prisma'
import { revalidatePath } from 'next/cache'

interface SaveBookingParams {
  barbershopId: string
  serviceId: string
  userId: string
  date: Date
}

export const saveBooking = async (params: SaveBookingParams) => {
  // Busca o ID do status 'Pending' na tabela BookingStatus
  console.log({ params })

  try {
    const pendingStatus = await db.bookingStatus.findUnique({
      where: {
        name: 'Pending',
      },
    })

    if (!pendingStatus) {
      throw new Error("Status 'Pending' not found in the database.")
    }

    await db.booking.create({
      data: {
        serviceId: params.serviceId,
        userId: params.userId,
        date: params.date,
        barbershopId: params.barbershopId,
        statusId: pendingStatus.id,
      },
    })
  } catch (error) {
    console.log({ error })
  } finally {
    revalidatePath('/')
    revalidatePath('/bookings')
  }
}
