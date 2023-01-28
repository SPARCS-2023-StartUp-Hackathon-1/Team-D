/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from 'next';
import Image from 'next/image';
import { CSSProperties, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '../../utils/api';
import { isMobile } from 'react-device-detect';
import { env } from '../../env/client.mjs';
import { useSession } from 'next-auth/react';

const Pay: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState('');
  useEffect(() => {
    if (session && session.user && session.user.name) {
      setName(session.user.name);
    }
  }, [session]);

  const isSuccess = router.asPath.split('?pg_token=')[1] ? true : false;
  const isFail = router.asPath.split('#')[1] === 'fail' ? true : false;
  const isCanceled = router.asPath.split('#')[1] === 'cancel' ? true : false;
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
  const { data, isLoading } = api.pay.getToken.useQuery();
  const [message, setMessage] = useState('');
  const [isPresent, setIsPresent] = useState(false);
  // const [amount, setAmount] = useState(null);
  // const handleSelect = value => {
  //   setAmount(value);
  // };

  //TODO: handle in server & type error.
  const handlePresentButton = () => {
    setIsPresent(true);
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
    return;
  };

  useEffect(() => {
    if (isSuccess) {
      setMessage('Payment success');
      // await approvePay();
    } else if (isFail) setMessage('Payment failed');
    else if (isCanceled) setMessage('Payment canceled');
  }, [isSuccess, isFail, isCanceled, data]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div
      className="text-center"
      style={{
        fontFamily: 'NanumSquareRound',
        fontSize: '30px',
        fontWeight: 800
      }}
    >
      <h1 className="font-size mx-10 mt-10 flex h-9 w-80 items-end text-left text-3xl font-extrabold tracking-widest">
        {name}님의 ooo축하 풍선꾸러미
      </h1>
      <Image
        src="/balloon.png"
        alt="Reward image"
        width={60}
        height={100}
        className="mx-10 mt-48"
      />
      <p
        className="h-18 text- font-ex mx-10 mt-10 flex w-80 items-end text-base  tracking-widest"
        style={{
          fontFamily: 'NanumSquareRound',
          fontSize: '17px',
          fontWeight: 800
        }}
      >
        oo님의 ooo 축하 선물로 풍선을 주고 ooo에 행복을 전달해보세요!
      </p>
      <p>{message}</p>
      {isPresent ? (
        <div className="absolute mx-12 mt-10 flex h-16 w-80 flex-col items-start">
          <label className="text-2xl tracking-widest">
            풍선에 얼마를 담으시겠어요?
          </label>
          <select
            id="amount"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option value="1000">1,000원</option>
            <option value="5000">5,000원</option>
            <option value="10000">10,000원</option>
          </select>
          <label className="text-2xl tracking-widest">
            누가 이 풍선을 줬다고 할까요?
          </label>
          <input
            id="giver"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          ></input>
          <label className="text-2xl tracking-widest">
            축하 메시지를 남겨보세요.
          </label>
          <input
            id="message"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          ></input>
          <button onClick={handleClick}>
            <Image
              src="/payment_icon_yellow_medium.png"
              alt="Payment Icon"
              width={70}
              height={30}
            />
          </button>
        </div>
      ) : (
        <button onClick={handlePresentButton}>
          <Image
            src="/presentButton.png"
            alt="Present button"
            width={315}
            height={48}
            className="mx-10 mt-10"
          />
        </button>
      )}
    </div>
  );
};

export default Pay;
