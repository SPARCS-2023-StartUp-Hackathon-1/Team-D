import { useSession } from "next-auth/react";
import KakaoLogin from "../components/KakaoLogin";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const {data: session, status} = useSession();
  const router = useRouter();

  useEffect(() => {
    // redirect to home if already logged in
    if (session) {
      void router.push('/');
    }
  }, [session]);

  return (
    <div className="flex flex-col items-center gap-2 m-auto">
      <KakaoLogin />
    </div>
  ); 
}

export default Login;