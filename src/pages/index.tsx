import { type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import KakaoLogin from "../components/KakaoLogin";
import { api } from "../utils/api";
import { useEffect } from "react";

enum S {
  a,
  b
}

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // 로딩중일때 글로벌 오버레이로 로고 띄우기...
    /* 
    if (status === "loading" || isLoading) {
      return <Image src = "/favicon.ico" alt = "logo" width={100} height={100}/>;
    }
    */
    if (!session) {
      void router.push("/login");
    }
    else {
      const { data: user, isLoading } = api.user.getUserBySession.useQuery();
      if (user?.isFirstLogin){
        void router.push("/registerUser");
      }
    }
  }, [router])

  return <>메인페이지</>;
};

export default Home;