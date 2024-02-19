import { Avatar, AvatarFallback, AvatarImage } from "@/app/_components/ui/avatar";
import { Badge } from "@/app/_components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/app/_components/ui/card";
import { Calendar } from "lucide-react";

export function CardScheduleWeek() {
    return (
        <Card className="w-64 h-64 bg-secondary rounded-xl">
        <CardHeader className="p-4 ">
          <div className="flex gap-1 flex-row flex-wrap items-center">
            <Badge className="w-fit h-fit bg-green-500 text-white bg-opacity-20">Barba</Badge>
            <Badge className="w-fit h-fit bg-yellow-500 text-white bg-opacity-20">Cabelo</Badge>
            <Badge className="w-fit h-fit bg-blue-500 text-white bg-opacity-20">Hidratação</Badge>
            <Badge className="w-fit h-fit bg-purple-500 text-white bg-opacity-20">Sonbrancelha</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <h1 className="text-gray-300 font-bold text-xl text-wrap w-24">Welder N. Fernandes</h1>
          <div className="py-5 flex -space-x-2 overflow-hidden">
            <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-primary">
              <AvatarImage src="https://github.com/welderfernandes.png" />
              <AvatarFallback>WF</AvatarFallback>
            </Avatar>
              <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-primary">

              <AvatarImage src="https://github.com/welderfernandes.png" />
              <AvatarFallback>WF</AvatarFallback>
            </Avatar>
              <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-primary">
              <AvatarImage src="https://github.com/welderfernandes.png" />
              <AvatarFallback>WF</AvatarFallback>

            </Avatar>
            
            <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-primary">
              <AvatarImage src="https://github.com/welderfernandes.png" />
              <AvatarFallback>WF</AvatarFallback>
            </Avatar>

            <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-primary">
              <AvatarFallback className="font-medium  leading-none ">9+</AvatarFallback>
            </Avatar>
            
          </div>
        </CardContent>
        <CardFooter className="absolute -bottom-2 gap-2 text-gray-400">
          <Calendar size={16} />
          <p className="text-sm font-medium">Mon, 12 July 2022</p>
        </CardFooter>
      </Card>
    )
}