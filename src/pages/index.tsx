import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { api } from '../utils/api';
import { type PropsWithChildren, useEffect, useState } from 'react';
import { ProfileImage } from '../components/profileImage';
import Image from 'next/image';
import ResponsiveCarousel from '../components/carousel';

interface MainFrameProps {
  profileSrc: string;
  name: string;
}

const MainFrame = ({
  profileSrc,
  name,
  children
}: PropsWithChildren<MainFrameProps>) => {
  return (
    <div className="flex h-screen w-full flex-col justify-start px-7">
      {/* <CloudTop/> */}
      <div className="mt-7 flex items-center z-10">
        <ProfileImage src={profileSrc} />

        <div className="flex flex-col">
          <div>
            <span
              style={{ fontFamily: 'NanumSquareRoundEB', fontSize: '28px' }}
            >
              {name}님
            </span>
            <span
              style={{ fontFamily: 'NanumSquareRoundEB', fontSize: '18px' }}
            >
              이
            </span>
          </div>
          <span style={{ fontFamily: 'NanumSquareRoundEB', fontSize: '18px' }}>
            행복을 담아 전달할 풍선 꾸러미
          </span>
        </div>
      </div>
      <span
        className="w-full bg-white lg:w-1/3 opacity-30 z-10"
        style={{ padding: '0.5px' }}
      ></span>
      <div className="mt-1 mb-1 flex h-full w-full items-center justify-center">
        {children}
      </div>

      {/* <CloudBottom/> */}
    </div>
  );
};

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
  const { data: session } = useSession();
  const { data: user, status: statusUser } = api.user.getUserBySession.useQuery(
    undefined, // no input
    { enabled: session?.user !== undefined , cacheTime: 0 }
  );
  const { data: events } = api.event.getAllEventsByUserId.useQuery(
    undefined, // no input
    { enabled: session?.user !== undefined }
  );
  const [carouselIdx, setCarouselIdx] = useState(0)
  const router = useRouter();

  useEffect(() => {
    // 로딩중일때 글로벌 오버레이로 로고 띄우기...
    // if (status === "loading" || isLoading) {
    //  return <Image src = "/favicon.ico" alt = "logo" width={100} height={100}/>;
    //}
    if (!session || !session.user?.id) {
      void router.push('/login');
    } else if (statusUser === 'success') {
      if (user?.isFirstLogin) {
        void router.push('/register');
      }
    }
  }, [session, statusUser]);
  const addButton = (
    <button
      className="mt-1 h-11 w-full rounded-md text-white"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={() => router.push('/addEvent/selectBalloon')}
      style={{ backgroundColor: '#11096B' }}
    >
      축하받을 날 추가하기
    </button>
  );
  return (
  <>
    <MainFrame
      profileSrc={session?.user?.image ?? ''}
      name={session?.user?.name ?? ''}
    >
      {events && events.length > 0 ? (
        <div className="flex h-5/6 flex-col">
          <ResponsiveCarousel events={events} setCarouselIdx={(i) => setCarouselIdx(i)}/>
          <button
            className="h-11 w-full rounded-md text-white"
            style={{ backgroundColor: '#11096B' }}
            onClick={() => {
                void router.push(`/eventDetail?eventId=${events[carouselIdx]?.id ?? "invalid-id"}`)
              }}
          >
            이 풍선 꾸러미 자세히 보기
          </button>
          {addButton}
        </div>
      ) : (
        <>
        <div className="flex h-5/6 flex-col z-10">
          <div className="h-5/6">{/* TODO: fill in sth*/}</div>
            <div
              className="flex flex-col"
              style={{ fontFamily: 'NanumSquareRoundEB', fontSize: '22px' }}
            >
              <span>축하받을 날을 추가해서</span>
              <span>더욱 의미있는 하루를 보내세요!</span>
            </div>
            {addButton}
          </div>
          <Image src="/balloon8.png" width={50} height={50} alt="" className='fixed right-20 top-28'/>
          <Image src="/balloon7.png" width={180} height={50} alt="" className='fixed -right-14 top-52'/>
          <Image src="/balloon6.png" width={100} height={50} alt="" className='fixed top-28 -left-3'/>
          <Image src="/balloon10.png" width={122} height={50} alt="" className='fixed left-5 bottom-5'/>
          <Image src="/balloon11.png" width={100} height={50} alt="" className='fixed right-14 bottom-8'/>
        </>
      )}
    </MainFrame>
  </>
  );
};
export default Home;
