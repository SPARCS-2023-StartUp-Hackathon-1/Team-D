import { type NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import { Button } from "../components/button"
import { api } from "../utils/api"


interface MessageProps {
  name: string
  money: number
  message: string
}

const Message = ({name, money, message}: MessageProps) => {
  return <div 
      className="w-full h-20 bg-white rounded-xl shadow-md p-2 color-primary bg-opacity-50"
    >
    <div className="flex justify-between">
      <div>
        {name}님
      </div>
      <div>
        {money}원
      </div>
    </div>
    <div className="mt-1">
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
  const router = useRouter()
  const {eventId} = router.query;
  const {data: event} = api.event.getEventById.useQuery({eventId: eventId?.toString() ?? ""});

  return <div className={`flex flex-col ${isOpened ? "h-fit":"h-screen"}`}>
    <div 
      className={`px-7  flex flex-col justify-start items-center z-30 pt-80 pb-3`}
    >
      <div
        className="w-full text-left pt-40"
        style={{ fontSize: '22px' }}
      >
        {event?.eventName}에<br/>{event?.destName}로<br/>전달할 꾸러미에
      </div>
      <div
        className="w-full text-left"
        style={{ fontSize: '22px' }}
      >
        {/* TODO: fetch people..*/}
        00명의 사람들이
      </div>
      <div
        className="w-full text-left"
        style={{ fontSize: '22px' }}
      >
        {event?.totalDonated}원을 함께했어요!
      </div>
      {
        isOpened ?
        <div className="flex flex-col h-fit w-full justify-end">
          {messages.map(({id, name, money, message}) => <Message key={id} name={name} message={message} money={money}/>)}
          <button className="flex w-full justify-center items-center m-2" onClick={() => setIsOpened(false)}>
            접기
          </button>
        </div>
        :<Button text="함께한 사람들의 마음 확인하기" enabled onClick={() => {setIsOpened(true)}}/>
      }
      <Button text="풍선 꾸러미 보내기" enabled/>
      <Button text='나의 풍선 꾸러미 둘러보기' onClick={() => {
        void router.push("/")

        }} enabled z_index="z-10"/>
    </div>
    <div className="flex flex-col justify-center absolute h-full z-10 w-full">
      <Image src="/ballooons.png" alt="" width="280" height="30" className="absolute self-center mt-10"/>
    </div>
    <div className="flex flex-col justify-start absolute h-full z-20">
      <Image src="/cloud1.png" alt="" width="390" height="30" className="mt-0"/>
    </div>
    <div className="flex flex-col justify-end absolute h-full z-20">
      <Image src="/cloud2.png" alt="" width="390" height="30"/>
      <Image src="/cloud1.png" alt="" width="390" height="30" className="mt-0"/>
    </div>
    {
      isOpened ?
      <div className="flex flex-col justify-end absolute h-full z-20 mt-52">
        <Image src="/cloud2.png" alt="" width="390" height="30"/>
        <Image src="/cloud1.png" alt="" width="390" height="30" className="mt-0"/>
      </div> : <></>
    }
  </div>
}
 
export default EventDetailPage
