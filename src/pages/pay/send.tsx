/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { api } from '../../utils/api';
import { env } from '../../env/client.mjs';

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState('');
  useEffect(() => {
    if (session && session.user && session.user.name) {
      setName(session.user.name);
    }
  }, [session]);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, isLoading } = api.pay.getToken.useQuery();

  //TODO: handle in server & type error.
  const payRequestParams = {
    cid: 'TC0ONETIME',
    partner_order_id: 'partner_order_id',
    partner_user_id: 'partner_user_id',
    item_name: 'test',
    quantity: '1',
    total_amount: '1000',
    vat_amout: '100',
    tax_free_amount: '0',
    approval_url: `${env.NEXT_PUBLIC_BASE_URL}/pay/success`,
    fail_url: `${env.NEXT_PUBLIC_BASE_URL}/pay#fail`,
    cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/pay#cancel`
  };

  const handleClick = async () => {
    if (data !== undefined && data.token !== null) {
      const token = data.token?.toString();
      const params = new URLSearchParams(payRequestParams);
      const res = await fetch(
        'https://kapi.kakao.com/v1/payment/ready?' + params.toString(),
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            Authorization: `KakaoAK ${token}`
          }
        }
      );

      if (res.status === 200) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { next_redirect_mobile_url, next_redirect_pc_url } =
          await res.json();
        if (isMobile) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
          await router.push(next_redirect_mobile_url);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
          await router.push(next_redirect_pc_url);
        }
      } else {
        console.log(`Kakao payment ready error: ${res.status}`);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="flex w-full flex-col justify-between px-7">
      {/* <div className="absolute mx-12 mt-10 flex h-16 w-80 flex-col items-start"> */}
      <Image
        src="/balloon7.png"
        alt=""
        width="280"
        height="30"
        className="absolute z-0 mx-12 mt-32 rotate-6 self-center"
      />
      <div
        className="absolute mx-2 mt-96 h-16 w-80 flex-col items-start"
        style={{
          fontFamily: 'NanumSquareRoundEB',
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.55)'
        }}
      >
        <label className="mt-20 text-xl tracking-widest">
          풍선에 얼마를 담으시겠어요?
        </label>
        <select
          id="amount"
          className="block w-full rounded-lg border border-gray-200 bg-gray-200 p-2.5 text-sm text-gray-900 opacity-60 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          <option value="1000">1,000원</option>
          <option value="5000">5,000원</option>
          <option value="10000">10,000원</option>
        </select>
        <label className="text-xl tracking-widest">
          누가 이 풍선을 줬다고 할까요?
        </label>
        <input
          id="giver"
          className="block w-full rounded-lg border border-gray-200 bg-gray-200 p-2.5 text-sm text-gray-900 opacity-60 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        ></input>
        <label className="text-xl tracking-widest">
          축하 메시지를 남겨보세요.
        </label>
        <input
          id="message"
          className="block h-32 w-full rounded-lg border border-gray-200 bg-gray-200 p-2.5 text-sm text-gray-900 opacity-60 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        ></input>
        <button onClick={handleClick} className="mt-3">
          <Image
            src="/payment_icon_yellow_medium.png"
            alt="Payment Icon"
            width={70}
            height={30}
          />
        </button>
      </div>
    </div>
  );
};

export default Home;
