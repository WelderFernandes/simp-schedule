import Header from "@/components/header";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Search from "./components/seach";
import { BookingItem } from "@/components/booking-item";

export default function Home() {
  return (
    <main className="">
     <Header />
      <div className="px-5 pt-5 flex gap-1 flex-col">
        <h2 className="text-xl font-bold">Olá Welder!</h2>
        <p className="text-sm capitalize">
          {format(new Date(), "EEEE',' dd 'de' MMMM", { 
            locale: ptBR
          })}</p>
      </div>

      <div className="px-5 pt-6 flex gap-1 flex-col">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Agendamentos</h2>
        <BookingItem />
      </div>
    </main>
  );
}
