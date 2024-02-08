import Image from "next/image"
import { Button } from "@/components/ui/button"
import { db } from "../../../../lib/prisma"
import { BarbershopInfo } from "./component/barbershop-info"
import { ServiceItem } from "./component/service-item"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"


interface BarbershopDatilsPageProps {
  params: {
    id: string
  }
}

async function BarbershopDatailsPage({params}: BarbershopDatilsPageProps) {
  const session = await getServerSession(authOptions)

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id
    },
    include: {
      services: true
    }
  })

  if (!barbershop) {
    return null
  }

  return (
    <div>
      <BarbershopInfo Barbershop={barbershop} />
      {barbershop.services.map((service) => (
        <ServiceItem key={service.id} service={service} barbershop={barbershop} isAuthenticated={!!session}/>
      ))}
    </div>
  )
}

export default BarbershopDatailsPage