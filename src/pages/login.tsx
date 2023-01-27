import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const KakaoLogin = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="text-white">
        {session.user?.name}님 반갑습니다 <br />
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }
  return (
    <div className="text-white">
      로그인되지 않았습니다 <br />
      <Image 
        className="hover:cursor-pointer"
        src="/kakao_login_large_wide.png" 
        alt="kakao_login_large_wide" 
        width={300}
        height={45}
        onClick={()=> signIn("kakao")}
      />
    </div>
  );
};

export default KakaoLogin;