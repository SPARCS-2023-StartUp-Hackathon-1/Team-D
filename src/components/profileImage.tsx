import Image from "next/image"

interface props {
    src: string
}

export const ProfileImage = ({src}: props) => {
  return <Image className="p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={src} alt = "profile image" width={80} height={80} />
}
