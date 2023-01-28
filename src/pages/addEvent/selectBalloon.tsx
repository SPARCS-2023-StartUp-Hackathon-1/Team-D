import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { api } from '../../utils/api';
import { useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image';

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const { data: user, status: statusUser } = api.user.getUserBySession.useQuery(
    undefined, // no input
    { enabled: session?.user !== undefined }
  );
  const router = useRouter();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!session || !session.user?.id) {
      void router.push('/login');
    } else if (statusUser !== 'error') {
      if (user?.isFirstLogin) {
        void router.push('/register');
      }
    }
  }, [session]);

  const [activeBalloon, setActiveBalloon] = useState(-1);

  const handleClick = (id: number) => () => {
    setActiveBalloon(id);
    console.log(activeBalloon);
  };

  return (
    <div>
      {/* <Image
        src="/Rectangle7.png"
        width={400}
        height={1000}
        alt=""
        className={`absolute opacity-${
          activeBalloon === -1 ? 0 : 100
        } h-full w-full opacity-0`}
      /> */}
      <div className="flex w-full flex-col justify-between px-7">
        <div className="mt-7 flex items-center">
          <div className="flex flex-col">
            <span
              style={{ fontFamily: 'NanumSquareRoundEB', fontSize: '28px' }}
            >
              {user?.name}님이 행복을 담아 전달하고 싶은 곳은 어디인가요?
            </span>
          </div>
        </div>
        <div
          className="mt-1, mb-1 flex w-full items-center justify-center"
          style={{
            height: 500
          }}
        >
          <button onClick={handleClick(6)}>
            <Image
              src="/balloon6.png"
              width={230}
              height={230}
              alt=""
              className={`absolute left-1/4 opacity-${
                activeBalloon === 6 ? 100 : 70
              } right-2/4 top-2/4 bottom-0 -rotate-12`}
            />
          </button>
          <button onClick={handleClick(7)}>
            <Image
              src="/balloon7.png"
              width={200}
              height={200}
              alt=""
              className={`absolute opacity-${
                activeBalloon === 7 ? 100 : 70
              } left-1/4 right-2/4 top-1/4 bottom-0 -rotate-6`}
            />
          </button>
          <button onClick={handleClick(8)}>
            <Image
              src="/balloon8.png"
              width={250}
              height={250}
              alt=""
              className={`absolute left-1/3 opacity-${
                activeBalloon === 8 ? 100 : 70
              }right-1/3 top-1/3 bottom-0 -rotate-6`}
            />
          </button>
          <button onClick={handleClick(10)}>
            <Image
              src="/balloon10.png"
              width={200}
              height={200}
              alt=""
              className={`absolute opacity-${
                activeBalloon === 10 ? 100 : 70
              } left-1/4 right-1/3 top-1/4 bottom-0 rotate-3`}
            />
          </button>
          <button onClick={handleClick(11)}>
            <Image
              src="/balloon11.png"
              width={200}
              height={200}
              alt=""
              className={`absolute left-1/3 right-2/3 top-1/3 bottom-0 opacity-${
                activeBalloon === 11 ? 100 : 70
              } rotate-3`}
            />
          </button>
          <button onClick={handleClick(12)}>
            <Image
              src="/balloon12.png"
              width={200}
              height={200}
              alt=""
              className={`absolute  opacity-${
                activeBalloon === 12 ? 100 : 70
              } left-1/3 right-1/4 top-2/4 bottom-0 rotate-3`}
            />
          </button>
        </div>

        <div
          className="m-auto flex flex-col"
          style={{ fontFamily: 'NanumSquareRoundEB', fontSize: '22px' }}
        >
          <Image src="/Rectangle6.png" width={320} height={87} alt="" />
          <span className="absolute h-20 w-80">{message}</span>
        </div>

        <button
          className="z-20 mt-3 h-11 w-full rounded-md text-white"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={() =>
            router.push(`/addEvent/selectedBalloon?balloon=${activeBalloon}`)
          }
          style={{ backgroundColor: '#11096B' }}
        >
          풍선 꾸러미 만들기
        </button>
        <button
          className="mt-3 h-11 w-full rounded-md text-gray-600"
          disabled
          style={{ backgroundColor: '#EFEFF0' }}
        >
          더 많은 기부금 보기
        </button>
      </div>
    </div>
  );
};

export default Home;
