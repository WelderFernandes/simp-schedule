'use client'

import Image from 'next/image'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { MenuIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import SideMenu from './side-menu'
import Link from 'next/link'

const Header = () => {
  return (
    <header>
      <Card className="rounded-none">
        <CardContent className="p-5 justify-between items-center flex flex-row ">
          <Link href="/">
            <h4 className="text-xl font-bold text-primary uppercase animate-pulse">
              SIMP
            </h4>
            <p className="text-gray-400 text-sm">Logo provisorio</p>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon size={16} />
              </Button>
            </SheetTrigger>

            <SheetContent className="p-0">
              <SideMenu />
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </header>
  )
}

export default Header
