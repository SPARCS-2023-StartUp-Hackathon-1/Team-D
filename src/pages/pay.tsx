/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "../utils/api";
import { isMobile } from "react-device-detect";
import { env } from "../env/client.mjs";

const Pay: NextPage = () => {
  const router = useRouter();
  const isSuccess = router.asPath.split("?pg_token=")[1] ? true : false;
  const isFail = router.asPath.split("#")[1] === "fail" ? true : false;
  const isCanceled = router.asPath.split("#")[1] === "cancel" ? true : false;
  const payRequestParams = {
    cid: "TC0ONETIME",
    partner_order_id: "partner_order_id",
    partner_user_id: "partner_user_id",
    item_name: "test",
    quantity: "1",
    total_amount: "1000",
    vat_amout: "100",
    tax_free_amount: "0",
    approval_url: `${env.NEXT_PUBLIC_BASE_URL}/pay#success`,
    fail_url: `${env.NEXT_PUBLIC_BASE_URL}/pay#fail`,
    cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/pay#cancel`,
  };
  const { data, isLoading } = api.pay.getToken.useQuery();
  const [message, setMessage] = useState("");

  //TODO: handle in server & type error.
  const handleClick = async () => {
    if (data !== undefined && data.token !== null) {
      const token = data.token?.toString();
      const params = new URLSearchParams(payRequestParams);
      const res = await fetch(
        "https://kapi.kakao.com/v1/payment/ready?" + params.toString(),
        {
          method: "POST",
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            Authorization: `KakaoAK ${token}`,
          },
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
      setMessage("Payment success");
      // await approvePay();
    } else if (isFail) setMessage("Payment failed");
    else if (isCanceled) setMessage("Payment canceled");
  }, [isSuccess, isFail, isCanceled, data]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="text-center">
      <h1>Pay test</h1>
      <button onClick={handleClick}>
        <Image
          src="/payment_icon_yellow_medium.png"
          alt="Payment Icon"
          width={70}
          height={30}
        />
      </button>
      <p>{message}</p>
    </div>
  );
};

export default Pay;
