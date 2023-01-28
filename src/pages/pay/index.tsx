/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from 'next';
import Image from 'next/image';
import { CSSProperties, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { api } from '../../utils/api';

const Pay: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const event = (router.query.event_name as string)
    ? (router.query.event_name as string)
    : 'null';
  const donation_org = (router.query.donation_org as string)
    ? (router.query.donation_org as string)
    : 'null';

  const [name, setName] = useState('');
  useEffect(() => {
    if (session && session.user && session.user.name) {
      setName(session.user.name);
    }
  }, [session]);

  // const isSuccess = router.asPath.split('?pg_token=')[1] ? true : false;
  // const isFail = router.asPath.split('#')[1] === 'fail' ? true : false;
  // const isCanceled = router.asPath.split('#')[1] === 'cancel' ? true : false;
  // const [message, setMessage] = useState('');
  const [isDetail, setIsDetail] = useState(false);
  const [isDetail2, setIsDetail2] = useState(false);

  useEffect(() => {
    if (isDetail) {
      setTimeout(() => setIsDetail2(true), 5000);
    }
  }, [isDetail]);

  if (isDetail2)
    return (
      <div className="flex w-full flex-col justify-between px-7">
        <div
          className="align-left justify-left mx-3 mt-60 flex flex-col"
          style={{ fontFamily: 'NanumSquareRoundEB', fontSize: '22px' }}
        >
          <span>donation 상세 설명</span>
        </div>
        <button
          className="mt-60 h-11 w-full rounded-md text-white"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            router.push('/pay/send');
          }}
          style={{ backgroundColor: '#11096B' }}
        >
          풍선 꾸러미 만들기
        </button>
      </div>
    );

  if (isDetail)
    return (
      <div className="flex w-full flex-col justify-between px-7">
        <div
          className="align-left justify-left mx-3 mt-60 flex flex-col"
          style={{ fontFamily: 'NanumSquareRoundEB', fontSize: '22px' }}
        >
          <span>{name}님께서는</span>
          <span>{event}을(를) 맞아</span>
          <span>축하해주시는 지인분들의 마음을</span>
          <span>{donation_org}에</span>
          <span>전달하고 싶어하셨습니다!</span>
        </div>
      </div>
    );

  return (
    <div className="flex w-full flex-col justify-between px-7">
      <div className="mt-7 flex items-center">
        <div className="flex flex-col">
          <span style={{ fontFamily: 'NanumSquareRoundEB', fontSize: '28px' }}>
            {name}님의 {event}축하 풍선꾸러미
          </span>
        </div>
      </div>
      <Image
        src="/ballooons.png"
        alt=""
        width="280"
        height="30"
        className="absolute -z-0 mx-12 mt-32 self-center"
      />
      <span
        style={{ fontFamily: 'NanumSquareRoundEB', fontSize: '22px' }}
        className="mt-96 flex flex-col"
      >
        <span>{event}을(를) 맞아</span>
        <span>{name}님과 Giftoo가</span>
        <span>뜻깊은 이벤트를준비했어요.</span>
      </span>
      <div className="z-10">
        <button
          className="mt-3 h-11 w-full rounded-md text-white"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            router.push('/pay/send');
          }}
          style={{ backgroundColor: '#11096B' }}
        >
          풍선 꾸러미 만들기
        </button>
        <button
          className="mt-3 h-11 w-full rounded-md text-white"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={() => {
            setIsDetail(true);
          }}
          style={{ backgroundColor: '#11096B' }}
        >
          이벤트 더 자세히 알아보기
        </button>
      </div>
    </div>
  );
};

export default Pay;
