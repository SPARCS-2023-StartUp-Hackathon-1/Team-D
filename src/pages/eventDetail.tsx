import { type NextPage } from "next"
import Image from "next/image"
import { useState } from "react"
import { Button } from "../components/button"

const Background = () => {
  return <>
     <Image src="/cloud1.png" alt="" width="390" height="30" className="absolute"/>
     <Image src="/ballooons.png" alt="" width="280" height="30" className="absolute self-center mt-20"/>
     {/* <Image src="/cloud1.png" alt="" width="390" height="30" className="mb-0"/> */}
     {/* <Image src="/cloud1.png" alt="" width="390" height="30" className="mb-0"/> */}
    </>
}

interface MessageProps {
  name: string
  money: number
  message: string
}

const Message = ({name, money, message}: MessageProps) => {
  return <div 
      className="w-full h-20 bg-white rounded-xl shadow-md p-2 color-primary bg-opacity-50"
      style={{ fontFamily: 'NanumSquareRoundEB'}}
    >
    <div className="flex justify-between">
      <div>
        {name}님
      </div>
      <div>
        {money}원
      </div>
    </div>
    <div className="pt-1">
      {message}
    </div>
  </div>
}



const EventDetailPage: NextPage = () => {
  const [isOpened, setIsOpened] = useState(false);
  const messages = [
    {id: 0, name: "Jung In", money: 5000, message: "blah blan blah"},
    {id: 1, name: "Jung In", money: 5000, message: "blah blan blah"},
    {id: 2, name: "Jung In", money: 5000, message: "blah blan blah"},
    {id: 3, name: "Jung In", money: 5000, message: "blah blan blah"},
  ];

  return <>
    <Background/>
    <div 
      className="px-7 pb-8 h-screen flex flex-col justify-end gap-2 items-center z-10"
    >
      <div
        className="w-full text-left"
        style={{ fontFamily: 'NanumSquareRoundEB', fontSize: '22px' }}
      >
        이벤트에<br/>기부처로<br/>전달할 꾸러미에
      </div>
      <div
        className="w-full text-left"
        style={{ fontFamily: 'NanumSquareRoundEB', fontSize: '22px' }}
      >
        00명의 사람들이
      </div>
      <div
        className="w-full text-left"
        style={{ fontFamily: 'NanumSquareRoundEB', fontSize: '22px' }}
      >
        000원을 함께했어요!
      </div>
      {
        !isOpened ?
        <>
          {messages.map(({id, name, money, message}) => <Message key={id} name={name} message={message} money={money}/>)}
        </>
        :<Button text="함께한 사람들의 마음 확인하기" enabled/>
      }
      <Button text="축하받을 날 추가하기" enabled={false}/>
    </div>
  </>
}
 
export default EventDetailPage
