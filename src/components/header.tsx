"use client"
import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import {  CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon, User2Icon, UserCircle, UserCircle2, UserCircle2Icon, UserIcon } from "lucide-react"
import {  signIn, signOut, useSession } from "next-auth/react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import Link from "next/link"

function Header() {
  const { data, status } = useSession()
  
  return (
    <Card>
      <CardContent className="flex justify-between p-5 items-center">
        <Image src="/Logo.png" alt="SIMP Logo"height={22} width={120}  />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <MenuIcon size={16} />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0 ">
            <SheetHeader className="p-5 text-left border-b border-solid border-secondary">
              <SheetTitle>
                Menu
              </SheetTitle>
            </SheetHeader>
            {data?.user ? (
             <div className="flex justify-between px-5 py-6 items-center">
               <div className="flex item-center gap-3">
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
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header