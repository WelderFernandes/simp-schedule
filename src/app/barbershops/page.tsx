import Header from "@/components/header"
import { db } from "../../../lib/prisma"
import { BarbershopItem } from "../(home)/components/barbershop-item"
import { redirect } from "next/navigation"
import Search from "../(home)/components/seach"

interface BarbershopPageProps {
  searchParams: {
    search?: string
  }
}

export default async function BarbershopPage({ searchParams }: BarbershopPageProps) {
  if (!searchParams.search) {
    return redirect("/")
  }
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive"
      }
    }
  })
  return (
    <>
    <Header />
    <div className="flex flex-col gap-6 p-5">
    <Search
      defaultValue={{
        search: searchParams.search
      }}
    />
      <h1 className="text-gray-400 font-bold text-xs uppercase">Resultados para &quot;{searchParams.search}&quot;</h1>
      <div className="grid grid-cols-2 gap-4">
        {barbershops.map((barbershop) => (
          <div key={barbershop.id} className="w-ful">
            <BarbershopItem  barbershop={barbershop} />
          </div>
        ))}
      </div>
      {/* {barbershops.map((barbershop) => (
        <BarbershopItem key={barbershop.id} barbershop={barbershop} />
      ))} */}
    </div>
    </>
  )
}