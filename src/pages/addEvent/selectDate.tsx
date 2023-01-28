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
  const { balloon, donationOrg } = router.query;

  useEffect(() => {
    if (!session || !session.user?.id) {
      void router.push('/login');
    } else if (statusUser !== 'error') {
      if (user?.isFirstLogin) {
        void router.push('/register');
      }
    }
  }, [session]);

  const [targetDate, setTargetDate] = useState(new Date());
  const [eventName, setEventName] = useState('');

  return (
    <div>
      <div className="flex w-full flex-col justify-between px-7">
        {/* <div className="mt-7 flex items-center"></div> */}
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
                `/addEvent/selectDate?balloon=${balloon}`
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
                className="absolute left-1/4 top-20 -rotate-6"
              />
            ) : (
              <></>
            )}
          </button>
          <div className="absolute mx-12 mt-72 h-16 w-80 flex-col items-start">
            <label
              className="mt-20 text-2xl tracking-widest"
              style={{
                fontFamily: 'NanumSquareRoundEB',
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.55)'
              }}
            >
              축하할 이벤트의 이름을 지어볼까요?
            </label>
            <input
              id="event"
              className="block w-full rounded-lg border border-gray-200 bg-gray-200 p-2.5 text-sm text-gray-900 opacity-60 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={eventName}
              onChange={e => {
                setEventName(e.currentTarget.value);
              }}
            ></input>
            <label
              className="mt-10 text-2xl tracking-widest"
              style={{
                fontFamily: 'NanumSquareRoundEB',
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.55)'
              }}
            >
              그 날은 언제인가요?
            </label>
            <DatePicker
              selected={targetDate}
              onChange={date => {
                if (date !== null) setTargetDate(date);
              }}
              className="block w-full rounded-lg border border-gray-200 bg-gray-200 p-2.5 text-sm text-gray-900 opacity-60 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
            {/* <input
              id="date"
              className="block w-full rounded-lg border border-gray-300 bg-gray-300 p-2.5 text-sm text-gray-900 opacity-40 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            ></input> */}
            <span
              style={{
                fontFamily: 'NanumSquareRoundEB',
                fontSize: '14px'
              }}
              className="mt-5"
            >
              {targetDate.getMonth() + 1}월 {targetDate.getDate()}일부터
              {targetDate.getMonth() + 1}월 {targetDate.getDate() + 1}일까지
            </span>
            <span
              style={{
                fontFamily: 'NanumSquareRoundEB',
                fontSize: '14px'
              }}
            >
              풍선을 선물 받습니다.
            </span>
            <button
              className="mt-6 h-11 w-full rounded-md text-white"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={() => {
                return router.push(
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  `/addEvent/complete?balloon=${balloon}&donationOrg=${donationOrg}&targetDate=${targetDate}&eventName=${eventName}`
                );
              }}
              style={{ backgroundColor: '#11096B' }}
            >
              축하받아 풍선 모으기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
