/* eslint-disable @typescript-eslint/no-misused-promises */
import { signIn } from 'next-auth/react';
import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const PaySuccess: NextPage = () => {
  const { data: session, status } = useSession();
  const [name, setName] = useState('');
  useEffect(() => {
    if (session && session.user && session.user.name) {
      setName(session.user.name);
    }
  }, [session]);

  return (
    <div className="flex w-full flex-col justify-between px-7 text-primary">
      <div className="mt-7 flex items-center">
        <div className="flex flex-col">
          <span style={{ fontFamily: 'NanumSquareRoundEB', fontSize: '28px' }}>
            {name}님의 ooo축하 풍선 꾸러미에 풍선을 하나 더 달았어요!
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
        className="z-10 mt-96 flex flex-col"
      >
        {name}님을 생각하는 마음을 모아 ooo에 전달하겠습니다!
      </span>
      <span
        style={{ fontFamily: 'NanumSquareRoundEB', fontSize: '14px' }}
        className="z-10 mt-6 flex flex-col"
      >
        선물한 풍선이 잘 전달되었는지 궁금하다면
      </span>
      <Image
        className="z-10 mx-auto mt-5 hover:cursor-pointer"
        src="/kakao_login_large_wide.png"
        alt="kakao_login_large_wide"
        width={300}
        height={45}
        onClick={() => {
          void signIn('kakao');
        }}
      />
    </div>
    // {/* <div
    //   className="text-center"
    //   style={{
    //     fontFamily: 'NanumSquareRound',
    //     fontSize: '30px',
    //     fontWeight: 800
    //   }}
    // >
    //   <h1 className="font-size mx-10 mt-20 flex h-9 w-80 items-end text-3xl font-extrabold tracking-widest">
    //     oo님의 ooo축하 풍선꾸러미에 풍선을 하나 더 달았어요!
    //   </h1>
    //   <Image
    //     src="/balloon.png"
    //     alt="Reward image"
    //     width={31}
    //     height={43}
    //     className="mx-10 mt-48"
    //   />
    //   <p>ooo에 oo님의 행복이 전달될거에요!</p>
    // </div> */}
  );
};

export default PaySuccess;
