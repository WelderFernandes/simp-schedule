"use server";

import { revalidatePath } from "next/cache";
import { db } from "../../../../../lib/prisma";

interface SaveBookingParams {
  barbershopId: string;
  serviceId: string;
  userId: string;
  date: Date;
}

export const saveBooking = async (params: SaveBookingParams) => {
  console.log({ params });
  await db.booking.create({
    data: {
      serviceId: params.serviceId,
      userId: params.userId,
      date: params.date,
      barbershopId: params.barbershopId,
    },
  });

  // revalidatePath("/");
  // revalidatePath("/bookings");
};