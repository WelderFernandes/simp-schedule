'use client'
import Header from '@/app/_components/header'
import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import { Separator } from '@/app/_components/ui/separator'
import { BellDot, LogOut, Settings2Icon, Star, User2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const route = useRouter()
  return (
    <div>
      <Header />
      <div className="flex flex-1 px-5 py-6 flex-col justify-between w-full">
        <h1 className="text-gray-300 font-bold text-xl">Configurações</h1>
        <div className="flex pt-6">
          <Image
            src="/barbershop.jpg"
            alt="logo"
            width={90}
            height={90}
            className="border border-secondary"
          />
          <div className="flex flex-col px-4">
            <h1 className="text-gray-300 font-bold text-2xl">Barber Shop</h1>
            <div className="text-gray-400 text-sm">
              <div className="flex items-center">
                <Star className="text-yellow-400 inline " size={16} />
                <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
                  4.95
                </p>
                <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
                >
                  73 avaliações
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center py4">
          <Badge className="w-fit h-fit bg-secondary text-white bg-opacity-20 gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Status do estabelecimento: Ativo
          </Badge>
        </div>
        <Separator className="mt-8" />
        <div className="py-8 flex flex-col gap-4">
          <Button
            variant="outline"
            className="w-full py-8 px-4 gap-3 items-center align-middle justify-start hover:border-primary"
          >
            <div className="px-2 py-2 rounded-sm bg-secondary">
              <Settings2Icon size={18} className="text-primary opacity-80" />
            </div>
            <span className="text-gray-200 font-bold text-sm">
              Dados principal
            </span>
          </Button>
          <Button
            variant="outline"
            className="w-full py-8 px-4 gap-3 items-center align-middle justify-start "
          >
            <div className="px-2 py-2 rounded-sm bg-secondary">
              <BellDot size={18} className="text-primary opacity-80" />
            </div>
            <p className="text-gray-200 font-bold text-sm">Notificações</p>
          </Button>
          <Button
            variant="outline"
            onClick={() => route.push('/painel/settings/team')}
            className="w-full py-8 px-4 gap-3 items-center align-middle justify-start "
          >
            <div className="px-2 py-2 rounded-sm bg-secondary">
              <BellDot size={18} className="text-primary opacity-80" />
            </div>
            <p className="text-gray-200 font-bold text-sm">Equipe</p>
          </Button>
          <Button
            variant="outline"
            className="w-full py-8 px-4 gap-3 items-center align-middle justify-start "
          >
            <div className="px-2 py-2 rounded-sm bg-secondary">
              <User2 size={18} />
            </div>
            <p className="text-gray-200 font-bold text-sm">Dados de perfil</p>
          </Button>
          <Button
            variant="outline"
            className="w-full py-8 px-4 gap-3 items-center align-middle justify-start "
          >
            <div className="px-2 py-2 rounded-sm bg-secondary">
              <Settings2Icon size={18} />
            </div>
            <p className="text-gray-200 font-bold text-sm">Link de acesso</p>
          </Button>
          <Button
            variant="outline"
            className="w-full py-8 px-4 gap-3 items-center align-middle justify-start "
          >
            <div className="px-2 py-2 rounded-sm bg-secondary">
              <LogOut size={18} />
            </div>
            <p className="text-gray-200 font-bold text-sm">Sair</p>
          </Button>
        </div>
      </div>
    </div>
  )
}
