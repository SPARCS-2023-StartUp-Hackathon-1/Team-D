import Image from "next/image"

interface props {
    src: string
}

export const ProfileImage = ({src}: props) => {
  return <Image className="m-2 p-1 rounded-full" src={src} alt = "profile image" width={80} height={80} />
}
