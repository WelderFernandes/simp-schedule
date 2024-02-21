import Header from "@/app/_components/header";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";

import { Button } from "@/app/_components/ui/button";
import { Carousel, CarouselContent } from "@/app/_components/ui/carousel";
import { Separator } from "@/app/_components/ui/separator";
import { PlusIcon, Settings2Icon } from "lucide-react";
import { getServerSession } from "next-auth";
import { CardScheduleWeek } from "./_component/card-schedule-week";
import { CardToday } from "./_component/card-today";
import HeaderPainel from "./_component/header-painel";


export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const [accounts] = await Promise.all([
    db.account.findMany(),
  ]);

  console.log({accounts, session})


  return (
    <div>
      <Header />

      <div className="pt-5">
        <HeaderPainel />
      </div>

      <div className="flex px-5 mt-6 align-middle justify-between items-center">
        <div>
          <h1 className="text-gray-300 font-bold text-2xl">Agendamentos da semana</h1>
          <p className="text-gray-400 text-sm">18 agendamentos</p>
        </div>
        <div className="flex items-center gap-3">

            <Button variant="outline" size="icon" className="border-none">
                <Settings2Icon size={18} />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="outline" size="icon" className="border-none">
                <PlusIcon size={18} />
            </Button>
          </div>
      </div>
      <div className="px-5 py-6">
        <Carousel>
          <CarouselContent className="gap-4 mx-auto">
            <div className="flex-1">
              <CardScheduleWeek />
            </div>
            <div className="flex-1">
              <CardScheduleWeek />
            </div>
            <div className="flex-1">
              <CardScheduleWeek />
            </div>
            <div className="flex-1">
              <CardScheduleWeek />
            </div>
            <div className="flex-1">
              <CardScheduleWeek />
            </div>
            <div className="flex-1">
              <CardScheduleWeek />
            </div>
            <div className="flex-1">
              <CardScheduleWeek />
            </div>
            <div className="flex-1">
              <CardScheduleWeek />
            </div>
           
          </CarouselContent>
        </Carousel>
      </div>
      <div className="flex px-5 mt-6 align-middle justify-between items-center">
        <div>
          <h1 className="text-gray-300 font-bold text-2xl">Agendamentos de hoje</h1>
          <p className="text-gray-400 text-sm">15 agendamentos</p>
        </div>
        <div className="flex items-center gap-3">

            <Button variant="outline" size="icon" className="border-none">
                <Settings2Icon size={18} />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="outline" size="icon" className="border-none">
                <PlusIcon size={18} />
            </Button>
          </div>
      </div>
      <div className="px-5 py-6 flex gap-2 flex-col">
        <CardToday/>
        <CardToday/>
        <CardToday/>
        <CardToday/>
        <CardToday/>
        <CardToday/>
        <CardToday/>
        <CardToday/>
        <CardToday/>
        <CardToday/>
      </div>
     </div>
  );
}
