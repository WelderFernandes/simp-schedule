'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/_components/ui/avatar'
import { Button } from '@/app/_components/ui/button'
import { Bell, Search } from 'lucide-react'
import { useSession } from 'next-auth/react'

const HeaderPainel = () => {
  const { data } = useSession()

  return (
    <>
      {data?.user && (
        <div className="flex justify-between px-5 py-6 items-center">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={data.user?.image ?? ''} />
              <AvatarFallback>WF</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xs text-gray-500">Good Evening!</h2>
              <h2 className="font-bold">{data.user.name}</h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="icon" className="rounded-full">
              <Search size={18} />
            </Button>

            <Button variant="secondary" size="icon" className="rounded-full">
              <Bell size={18} />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default HeaderPainel
