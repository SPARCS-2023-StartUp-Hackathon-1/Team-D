import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "../utils/api";
import { type PropsWithChildren, useEffect } from "react";
import { ProfileImage } from "../components/profileImage";
import Image from "next/image";
import ResponsiveCarousel from "../components/carousel";

interface MainFrameProps {
    profileSrc: string
    name: string
}

const MainFrame = ({profileSrc, name, children}: PropsWithChildren<MainFrameProps>) => {
  return <div className="flex flex-col justify-start w-full px-7 h-screen">
    {/* <CloudTop/> */}
    <div className="flex items-center mt-7">
      <ProfileImage src={profileSrc}/>
    
      <div className="flex flex-col">
        <div>
          <span style={{fontFamily: 'NanumSquareRoundEB', fontSize: '28px'}}>{name}님</span>
          <span style={{fontFamily: 'NanumSquareRoundEB', fontSize: '18px'}}>이</span>
        </div>
        <span style={{fontFamily: 'NanumSquareRoundEB', fontSize: '18px'}}>행복을 담아 전달할 풍선 꾸러미</span>
      </div>
    </div>
    <span className="w-full bg-white lg:w-1/3" style={{padding: "0.5px"}}></span>
    <div
      className="flex justify-center items-center w-full mt-1 mb-1 h-full"
     >
      {children}
     </div>

    {/* <CloudBottom/> */}
  </div>;

  }

/* const dummyEvents: Event & {destination: DonateDestination} = [ */
/*   { */
/*     id: "dummyid",  */
/*     eventName: "seo birthday",  */
/*     totalDonated: 100,  */
/*     createdAt: new Date(),  */
/*     eventDate: new Date(),  */
/*     destId: "dest",  */
/*     userId: "userId",  */
/*     destination: {id: "destInnerId", tags: [], name: "unicef"} */
/*   } */
/* ] */

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const {data: user, status: statusUser} = api.user.getUserBySession.useQuery(
    undefined, // no input
    { enabled: session?.user !== undefined },
  );
  const {data: events} = api.event.getAllEventsByUserId.useQuery(
    undefined, // no input
    { enabled: session?.user !== undefined },
  );

  const router = useRouter();

  useEffect(() => {
    // 로딩중일때 글로벌 오버레이로 로고 띄우기...
    // if (status === "loading" || isLoading) {
    //  return <Image src = "/favicon.ico" alt = "logo" width={100} height={100}/>;
    //}
    if (!session || !session.user?.id) {
      void router.push("/login");
    }
    else if (statusUser !== "error") {
      if (user?.isFirstLogin){
        void router.push("/register");
      }
    }
  }, [session])

  const addButton = <button className="text-white rounded-md w-full h-11 mt-1"style={{backgroundColor: "#11096B"}}>축하받을 날 추가하기</button>;

  return <MainFrame profileSrc={session?.user?.image??""} name={session?.user?.name ?? ""}>{
      events && events.length === 0 ? 
        <div className="flex flex-col h-5/6">
          <ResponsiveCarousel/>
          <button className="text-white rounded-md w-full h-11"style={{backgroundColor: "#11096B"}}>이 풍선 꾸러미 자세히 보기</button>
          {addButton}
        </div>:
        <div className="flex flex-col h-5/6">
          <div className="h-5/6">
            {/* TODO: fill in sth*/}
          </div>
          <div className="flex flex-col" style={{fontFamily: 'NanumSquareRoundEB', fontSize: '22px'}}>
            <span>축하받을 날을 추가해서</span>
            <span>더욱 의미있는 하루를 보내세요!</span>
          </div>
          {addButton}
        </div>
    }</MainFrame>;
}

export default Home;
