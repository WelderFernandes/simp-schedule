'use client'
import { Button } from '@/app/_components/ui/button'
import { Separator } from '@/app/_components/ui/separator'
import { StoreIcon, UserCircle2Icon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { SelectButton } from './_component/select-button'

export default function Initialize() {
  const [isSelectedCompany, setIsSelectedCompany] = useState(false)
  const [isSelectedUser, setIsSelectedUser] = useState(false)

  function handleCompany() {
    setIsSelectedCompany(!isSelectedCompany)
    setIsSelectedUser(false)
  }

  function handleUser() {
    setIsSelectedUser(!isSelectedUser)
    setIsSelectedCompany(false)
  }

  return (
    <div className="flex flex-1 flex-col items-center  h-full">
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-2xl font-bold uppercase text-gray-300 ">
          Vamos começar a sua conta
        </h1>
      </div>
      <h3 className="text-xl font-bold text-gray-300 py-5 text-center ">
        Selecione seu perfil e começe a sua jornada
      </h3>
      <Separator className="w-[350px] h-[2px]" />
      <div className="flex justify-center items-center py-10 flex-col gap-10">
        <Button
          className="
          w-[350px] h-[100px] flex align-middle px-5 gap-6 bg-secondary border-none hover:cursor-pointer hover:bg-zinc-700
          "
          onClick={handleCompany}
        >
          <StoreIcon size={36} className="text-purple-400 text-opacity-50" />
          <div className="flex flex-col w-full text-left">
            <h2 className="font-bold text-gray-300">Prestar serviços</h2>
            <p className="text-xs text-gray-400">
              Quero oferecer meus serviços
            </p>
          </div>
        </Button>
        <Button
          className="w-[350px] h-[100px] flex align-middle px-5 gap-6 bg-secondary border-none hover:cursor-pointer hover:bg-zinc-700"
          onClick={handleUser}
        >
          <UserCircle2Icon
            size={36}
            className="text-green-400 text-opacity-50"
          />
          <div className="flex flex-col w-full text-left">
            <h2 className="font-bold text-gray-300">Sou um cliente</h2>
            <p className="text-xs text-gray-400">Quero agendar um serviço</p>
          </div>
        </Button>
      </div>
      <h4>
        Já tem uma conta?{' '}
        <Link href="/auth" className="text-primary">
          Fazer login
        </Link>
      </h4>
      <SelectButton
        name="Prestar Serviços"
        isSelected={isSelectedCompany}
        onClick={handleCompany}
      />
      <SelectButton
        name="Prestar Serviços"
        isSelected={isSelectedCompany}
        onClick={handleCompany}
      />
      <footer className="py-6 px-5 bottom-0">
        <Button variant="secondary" className="disabled w-[350px] h-[50px] ">
          Continuar
        </Button>
      </footer>
    </div>
  )
}
