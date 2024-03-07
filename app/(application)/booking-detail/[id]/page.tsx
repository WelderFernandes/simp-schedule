import { db } from '@/app/_lib/prisma'
import Header from '@/app/_components/header'
import BarbershopHeaderInfo from './_components/barbershopHeader-info'
// import ServiceItem from './_components/service-item'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/app/_lib/auth'

interface BookingDetailProps {
  params: {
    id?: string
  }
}

const BookingDetail = async ({ params }: BookingDetailProps) => {
  // const session = await getServerSession(authOptions)

  if (!params.id) {
    console.error('No barbershop id provided in route params', params.id)
    return null
  }

  const bookings = await db.booking.findUnique({
    where: {
      id: params.id,
    },
    include: {
      service: true,
      barbershop: true,
    },
  })

  if (!bookings) {
    // TODO: redirecionar para home page
    return null
  }

  return (
    <div>
      <Header />
      <BarbershopHeaderInfo barbershop={bookings.barbershop} />

      {/* <div className="px-5 flex flex-col gap-4 py-6">
        {barbershop.services.map((service) => (
          <ServiceItem
            key={service.id}
            barbershop={barbershop}
            service={service}
            isAuthenticated={!!session?.user}
          />
        ))}
      </div> */}
    </div>
  )
}

export default BookingDetail
