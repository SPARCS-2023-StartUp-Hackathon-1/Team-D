import Image from "next/image"

interface props {
    src: string,
    classNames?: string,
}

export const ProfileImage = ({src, classNames=""}: props) => {
  return <Image className={`m-2 p-1 rounded-full ${classNames}`} src={src} alt = "profile image" width={80} height={80} />
}
