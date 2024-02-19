import Header from "@/app/_components/header";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";

import { Avatar, AvatarFallback, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent, CardDescription, CardFooter } from "@/app/_components/ui/card";
import { Carousel, CarouselContent } from "@/app/_components/ui/carousel";
import { Separator } from "@/app/_components/ui/separator";
import { Calendar, PlusIcon, Settings2Icon } from "lucide-react";
import { getServerSession } from "next-auth";
import { CardScheduleWeek } from "./_component/card-schedule-week";
import HeaderPainel from "./_component/header-painel";


export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const [barbershops, recommendedBarbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({}),
    db.barbershop.findMany({
      orderBy: {
        id: "asc",
      },
    }),
    session?.user
      ? db.booking.findMany({
          where: {
            userId: (session.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          include: {
            service: true,
            barbershop: true,
          },
        })
      : Promise.resolve([]),
  ]);

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
        <Card>
          <CardContent className="flex justify-between gap-5 items-center pt-6 align-middle">
            <div>
              <h1 className="text-gray-300 font-bold text-xl text-wrap">Barba</h1>
              <CardDescription className="text-gray-400">Welder n. Fernandes</CardDescription>
            </div>
            <div className="flex flex-col text-gray-400 item-right">
              <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-secondary">
                <AvatarImage src="https://github.com/welderfernandes.png" />
                <AvatarFallback>WF</AvatarFallback>
              </Avatar>
            </div>
          </CardContent>
           <Separator orientation="horizontal" className="my-2"/>
          <CardFooter className="flex gap-2 text-gray-400">
          <Calendar size={16} />
          <p className="text-sm font-medium">Mon, 12 July 2022</p>
        </CardFooter>
        </Card>
        <Card>
          <CardContent className="flex justify-between gap-5 items-center pt-6 align-middle">
            <div>
              <h1 className="text-gray-300 font-bold text-xl text-wrap">Barba</h1>
              <CardDescription className="text-gray-400">Welder n. Fernandes</CardDescription>
            </div>
            <div className="flex flex-col text-gray-400 item-right">
              <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-secondary">
                <AvatarImage src="https://github.com/welderfernandes.png" />
                <AvatarFallback>WF</AvatarFallback>
              </Avatar>
            </div>
          </CardContent>
           <Separator orientation="horizontal" className="my-2"/>
          <CardFooter className="flex gap-2 text-gray-400">
          <Calendar size={16} />
          <p className="text-sm font-medium">Mon, 12 July 2022</p>
        </CardFooter>
        </Card>
        <Card>
          <CardContent className="flex justify-between gap-5 items-center pt-6 align-middle">
            <div>
              <h1 className="text-gray-300 font-bold text-xl text-wrap">Barba</h1>
              <CardDescription className="text-gray-400">Welder n. Fernandes</CardDescription>
            </div>
            <div className="flex flex-col text-gray-400 item-right">
              <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-secondary">
                <AvatarImage src="https://github.com/welderfernandes.png" />
                <AvatarFallback>WF</AvatarFallback>
              </Avatar>
            </div>
          </CardContent>
           <Separator orientation="horizontal" className="my-2"/>
          <CardFooter className="flex gap-2 text-gray-400">
          <Calendar size={16} />
          <p className="text-sm font-medium">Mon, 12 July 2022</p>
        </CardFooter>
        </Card>
        <Card>
          <CardContent className="flex justify-between gap-5 items-center pt-6 align-middle">
            <div>
              <h1 className="text-gray-300 font-bold text-xl text-wrap">Barba</h1>
              <CardDescription className="text-gray-400">Welder n. Fernandes</CardDescription>
            </div>
            <div className="flex flex-col text-gray-400 item-right">
              <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-secondary">
                <AvatarImage src="https://github.com/welderfernandes.png" />
                <AvatarFallback>WF</AvatarFallback>
              </Avatar>
            </div>
          </CardContent>
           <Separator orientation="horizontal" className="my-2"/>
          <CardFooter className="flex gap-2 text-gray-400">
          <Calendar size={16} />
          <p className="text-sm font-medium">Mon, 12 July 2022</p>
        </CardFooter>
        </Card>
        <Card>
          <CardContent className="flex justify-between gap-5 items-center pt-6 align-middle">
            <div>
              <h1 className="text-gray-300 font-bold text-xl text-wrap">Barba</h1>
              <CardDescription className="text-gray-400">Welder n. Fernandes</CardDescription>
            </div>
            <div className="flex flex-col text-gray-400 item-right">
              <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-secondary">
                <AvatarImage src="https://github.com/welderfernandes.png" />
                <AvatarFallback>WF</AvatarFallback>
              </Avatar>
            </div>
          </CardContent>
           <Separator orientation="horizontal" className="my-2"/>
          <CardFooter className="flex gap-2 text-gray-400">
          <Calendar size={16} />
          <p className="text-sm font-medium">Mon, 12 July 2022</p>
        </CardFooter>
        </Card>
      </div>
     </div>
  );
}
