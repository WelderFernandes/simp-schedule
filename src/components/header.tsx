"use client"
import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import {  MenuIcon } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { SideMenu } from "./side-menu"
import Link from "next/link"

function Header() {
  
  return (
      <header>
      <Card className="rounded-none">
            <CardContent className="flex justify-between p-5 items-center">
              <Link href="/">
                <Image src="/Logo.png" alt="SIMP Logo"height={22} width={120}  />
              </Link>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <MenuIcon size={16} />
                  </Button>
                </SheetTrigger>
                <SheetContent className="p-0 ">
                  <SideMenu />
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>
      </header>
  )
}

export default Header