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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const activeBalloon = router.asPath.split('?balloon=')[1];

  useEffect(() => {
    if (!session || !session.user?.id) {
      void router.push('/login');
    } else if (statusUser !== 'error') {
      if (user?.isFirstLogin) {
        void router.push('/register');
      }
    }
  }, [session]);

  const handleClick = (id: number) => () => {};

  return (
    <div>
      <div className="flex w-full flex-col justify-between px-7">
        <div className="mt-7 flex items-center">
          <div
            className="flex flex-col"
            style={{ fontFamily: 'NanumSquareRoundEB', fontSize: '28px' }}
          >
            <span>{user?.name}님의</span>
            <span>생일에 </span>
            <span>컴패션에 전달한 풍선꾸러미가 만들어졌습니다!</span>
          </div>
        </div>
        <div
          className="mt-1, mb-1 flex w-full items-center justify-center"
          style={{
            height: 500
          }}
        >
          <button
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={() => {
              return router.push(
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                `/addEvent/selectDate?balloon=${activeBalloon}`
              );
            }}
          >
            {activeBalloon ? (
              <Image
                src={`/balloon${activeBalloon}.png`}
                width={200}
                height={200}
                alt=""
                className="absolute left-1/4 -rotate-6"
              />
            ) : (
              <></>
            )}
          </button>
        </div>

        <div
          className="m-auto flex flex-col"
          style={{ fontFamily: 'NanumSquareRoundEB', fontSize: '22px' }}
        ></div>
      </div>
    </div>
  );
};

export default Home;
