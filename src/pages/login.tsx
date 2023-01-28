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
          console.log("session is alive!");
          void router.push('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

  return (
    <div className="flex flex-col items-center gap-2">
      <KakaoLogin />
    </div>
  ); 
}

export default Login;