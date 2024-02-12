import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, UserCircle2Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export function SideMenu() {
  const { data } = useSession()

  return (
    <>
      <SheetHeader className="p-5 text-left border-b border-solid border-secondary">
              <SheetTitle>
                Menu
              </SheetTitle>
            </SheetHeader>
            {data?.user ? (
            //  <div className="flex justify-between px-5 py-6">
            //    <div className="flex gap-2 ">
            //     <Avatar>
            //       <AvatarImage src={data.user?.image as string} />
            //       <AvatarFallback>{data.user?.name?.charAt(0) as string}</AvatarFallback>
            //     </Avatar>
            //     <h2 className="font-bold">{data.user?.name}</h2>
            //   </div>
            //   <Button variant="secondary" size={"icon"} className="h-8 w-8" onClick={() =>  signOut() }>
            //     <LogOutIcon size={20} />
            //   </Button>
            //  </div>
          <div className="flex px-5 gap-3 py-6 items-center justify-between ">
            <div className="flex item-center gap-2 items-center ">
              <Avatar>
                <AvatarImage src={data.user?.image as string} />
                <AvatarFallback>{data.user?.name?.charAt(0) as string}</AvatarFallback>
              </Avatar>
              <h2 className="font-bold">{data.user?.name}</h2>
            </div>
            <Button variant="secondary" size={"icon"} className="h-8 w-8" onClick={() =>  signOut() }>
              <LogOutIcon size={20} />
            </Button>
          </div>
            ): (
              <div className="flex flex-col px-5 gap-3 py-6 items-left">
                <div className="flex item-center gap-2 items-center ">
                  <UserCircle2Icon size={32} />
                  <h2 className="font-bold">Olá, faca seu login</h2>
                </div>
                <Button variant="secondary" size={"icon"} className="w-full justify-start" onClick={() =>  signIn('google') }>
                  <LogInIcon className="mx-2" size={18} />
                  Fazer login
                </Button>
              </div>
            ) 
          }
          <div className="flex flex-col gap-3 px-5">
            <Button variant="outline" className="justify-start" asChild>
              <Link href='/'>
                <HomeIcon size={18} className="mx-2"/>
                Inicio
              </Link>
            </Button>
          </div>
          {data?.user && (
            <div className="flex flex-col gap-3 px-5 py-5">
              <Button variant="outline" className="justify-start" asChild>
                <Link href='/bookings'>
                  <CalendarIcon size={18} className="mx-2"/>
                  Agendamentos
                </Link>
              </Button>
            </div>
          )}
    </>
  )
}