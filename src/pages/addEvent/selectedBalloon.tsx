import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { api } from '../../utils/api';
import { useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image';

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { balloon, donationOrg } = router.query;

  useEffect(
  () => {
    setTimeout(() => {
      void router.push(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `/addEvent/selectDate?balloon=${balloon}&donationOrg=${donationOrg}`
      );
    }, 3000)
  }, [balloon, donationOrg])


  return (
    <div>
      <div className="flex w-full flex-col justify-between px-7">
        <div className="mt-7 flex items-center">
          <div className="flex flex-col">
            <span
              style={{ fontFamily: 'NanumSquareRoundEB', fontSize: '28px' }}
            >
              {session?.user?.name}님을 축하하며 Giftoo도 풍선을 선물할게요!
            </span>
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
                `/addEvent/selectDate?balloon=${balloon}&donationOrg=${donationOrg}`
              );
            }}
          >
            {balloon ? (
              <Image
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                src={`/balloon${balloon}.png`}
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
