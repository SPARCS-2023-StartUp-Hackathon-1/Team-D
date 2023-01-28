import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { api } from '../../utils/api';
import { SetStateAction, useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const { data: user, status: statusUser } = api.user.getUserBySession.useQuery(
    undefined, // no input
    { enabled: session?.user !== undefined }
  );
  const router = useRouter();
  console.log(router.query);
  const { balloon, donationOrg, targetDate, eventName } = router.query;

  useEffect(() => {
    if (!session || !session.user?.id) {
      void router.push('/login');
    } else if (statusUser !== 'error') {
      if (user?.isFirstLogin) {
        void router.push('/register');
      }
    }
  }, [session]);

  return (
    <div>
      <div className="flex w-full flex-col justify-between px-7">
        <div className="mt-7 flex items-center">
          <div
            className="flex flex-col"
            style={{ fontFamily: 'NanumSquareRoundEB', fontSize: '28px' }}
          >
            <span>{user?.name}님의</span>
            <span>{eventName}에</span>
            <span>{donationOrg}으로 전달할</span>
            <span>풍선꾸러미가 만들어졌습니다!</span>
          </div>
        </div>
        {balloon ? (
          <Image
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            src={`/balloon${balloon}.png`}
            width={200}
            height={200}
            alt=""
            className="absolute left-1/4 top-1/3 -rotate-6"
          />
        ) : (
          <></>
        )}
        <button
          className="mt-96 h-11 w-full rounded-md text-white"
          style={{ backgroundColor: '#11096B' }}
        >
          링크 복사하기
        </button>
        <button
          className="mt-3 h-11 w-full rounded-md text-white"
          style={{ backgroundColor: '#11096B' }}
        >
          인스타그램 스토리로 공유하기
        </button>
      </div>
    </div>
  );
};

export default Home;
