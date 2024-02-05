import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"

function Header() {
  return (
    <Card>
      <CardContent className="flex justify-between p-5 items-center">
        <Image src="/Logo.png" alt="SIMP Logo"height={22} width={120}  />
        <Button variant="outline" size="icon" className="h-8 w-8">
          <MenuIcon size={16} />
        </Button>
      </CardContent>
    </Card>
  )
}

export default Header