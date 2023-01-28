import { type NextPage } from 'next';
import { useRouter } from 'next/router';
import { api } from '../../utils/api';
import { useState } from 'react';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Home: NextPage = () => {
  /* const { data: _, status } = useSession(); */
  const router = useRouter();
  const { balloon, donationOrg } = router.query;
  const [targetDate, setTargetDate] = useState(new Date());
  const [eventName, setEventName] = useState('');
  const createEvent = api.event.createEvent.useMutation();

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
              className="mt-20 text-2xl tracking-widest text-primary"
              style={{
                fontFamily: 'NanumSquareRoundEB',
                fontSize: '14px',
              }}
            >
              축하할 이벤트의 이름을 지어볼까요?
            </label>
            <input
              id="event"
              className="text-primary block w-full rounded-lg border bg-white bg-opacity-30 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
              value={eventName}
              onChange={e => {
                setEventName(e.currentTarget.value);
              }}
            ></input>
            <label
              className="mt-10 text-2xl tracking-widest text-primary"
              style={{
                fontFamily: 'NanumSquareRoundEB',
                fontSize: '14px',
              }}
            >
              그 날은 언제인가요?
            </label>
            <DatePicker
              selected={targetDate}
              onChange={date => {
                if (date !== null) setTargetDate(date);
              }}
              className="block text-primary w-full rounded-lg bg-white bg-opacity-30 p-2.5 text-sm  border border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
            <span
              style={{
                fontFamily: 'NanumSquareRoundEB',
                fontSize: '14px'
              }}
              className="mt-5 text-primary"
            >
              {targetDate.getMonth() + 1}월 {targetDate.getDate() - 1}일부터{" "}
              {targetDate.getMonth() + 1}월 {targetDate.getDate() + 1}일까지{" "}
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
              onClick={() => {
                createEvent.mutate({eventDate: new Date(targetDate), eventName, destName: donationOrg?.toString() ?? ""})
                void router.push(
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
