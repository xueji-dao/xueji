import Image from 'next/image'

type Props = {
  name: string
  picture: string
}

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center">
      <Image src={picture} height={48} width={48} className="mr-4 size-12 rounded-full" alt={name} />
      <div className="text-xl font-bold">{name}</div>
    </div>
  )
}

export default Avatar
