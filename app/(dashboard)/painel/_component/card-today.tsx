import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/_components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/app/_components/ui/card'
import { Separator } from '@/app/_components/ui/separator'
import { Calendar } from 'lucide-react'

export function CardToday() {
  return (
    <Card>
      <CardContent className="flex justify-between gap-5 items-center pt-6 align-middle">
        <div>
          <h1 className="text-gray-300 font-bold text-xl text-wrap">Barba</h1>
          <CardDescription className="text-gray-400">
            Welder n. Fernandes
          </CardDescription>
        </div>
        <div className="flex flex-col text-gray-400 item-right">
          <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-secondary">
            <AvatarImage src="https://github.com/welderfernandes.png" />
            <AvatarFallback>WF</AvatarFallback>
          </Avatar>
        </div>
      </CardContent>
      <Separator orientation="horizontal" className="my-2" />
      <CardFooter className="flex gap-2 text-gray-400 align-middle items-center pb-3">
        <Calendar size={16} />
        <p className="text-sm font-medium">Mon, 12 July 2022</p>
      </CardFooter>
    </Card>
  )
}
