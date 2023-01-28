import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

const KakaoLogin = () => {
  const router = useRouter();
  return (
    <div className="w-80 h-60">
      <Image src = "/favicon.ico" alt = "logo" width={100} height={100} className="mb-12 mx-auto" />
      <p className="text-center w-full mb-5" style={{fontFamily: 'NanumSquareRoundEB', fontSize: '28px'}}>시작하기</p>
      <Image 
        className="hover:cursor-pointer mx-auto"
        src="/kakao_login_large_wide.png" 
        alt="kakao_login_large_wide" 
        width={300}
        height={45}
        onClick={()=> {signIn("kakao").catch()}}
      />
    </div>
  );
};

export default KakaoLogin;