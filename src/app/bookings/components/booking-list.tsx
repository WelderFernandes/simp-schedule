"use client"

import { Booking } from "@prisma/client"

interface BookingListProps {
  booking: Booking
}
export function BookingList() {
  return (
    <div>
      <h1>Booking List</h1>
    </div>
  )
}