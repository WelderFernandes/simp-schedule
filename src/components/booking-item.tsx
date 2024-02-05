import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

export function BookingItem() {
  return (
    <Card>
      <CardContent className="p-5 flex justify-between py-0">
        <div className="flex flex-col gap-2 py-5">
          <Badge className="text-primary bg-[#221c3d] hover:bg-[#221c3d] w-fit">Confirmado</Badge>
          <h2>Corte de Cabelo</h2>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://github.com/lukebemish.png" />
              <AvatarFallback>W</AvatarFallback>
            </Avatar>
            <h3 className="ml-2">Vintage Barbe</h3>
          </div>
        </div>
        <div className="flex flex-col item-center text-center justify-center border-l border-solid border-secondary px-3">
          <p className="text-sm">Fevereiro</p>
          <p className="text-2xl">06</p>
          <p className="text-sm">09:45</p>
        </div>
      </CardContent>
    </Card>
  )
}