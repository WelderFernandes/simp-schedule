import { UserCircle2Icon } from 'lucide-react'

export function SelectButton({
  name,
  isSelected,
  onClick,
}: {
  name: string
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      className={`w-[350px] h-[100px] flex align-middle px-5 gap-6 ${
        isSelected
          ? 'bg-secondary border-none hover:cursor-pointer hover:bg-zinc-700'
          : 'bg-secondary border-none hover:cursor-pointer hover:bg-zinc-700'
      }`}
      onClick={onClick}
    >
      <div
        className={`${
          isSelected
            ? 'w-10 h-10 bg-secondary border-none hover:cursor-pointer hover:bg-zinc-700'
            : 'w-10 h-10 bg-secondary border-none hover:cursor-pointer hover:bg-zinc-700'
        }`}
      >
        <UserCircle2Icon />
      </div>
      <div className={`${isSelected ? 'text-white' : 'text-white'}`}>
        {name}
      </div>
    </button>
  )
}
