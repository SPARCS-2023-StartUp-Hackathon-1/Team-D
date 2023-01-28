/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from 'next';
import Image from 'next/image';

const PaySuccess: NextPage = () => {
  return (
    <div
      className="text-center"
      style={{
        fontFamily: 'NanumSquareRound',
        fontSize: '30px',
        fontWeight: 800
      }}
    >
      <h1 className="font-size mx-10 mt-20 flex h-9 w-80 items-end text-3xl font-extrabold tracking-widest">
        oo님의 ooo축하 풍선꾸러미에 풍선을 하나 더 달았어요!
      </h1>
      <Image
        src="/balloon.png"
        alt="Reward image"
        width={31}
        height={43}
        className="mx-10 mt-48"
      />
      <p>ooo에 oo님의 행복이 전달될거에요!</p>
    </div>
  );
};

export default PaySuccess;
