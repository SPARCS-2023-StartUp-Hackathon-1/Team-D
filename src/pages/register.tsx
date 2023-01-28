import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../utils/api";
import { ProfileImage } from "../components/profileImage";
import { useRouter } from "next/router";

const Register = () => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const router = useRouter();
  const { mutateAsync: mutateName } = api.user.updateName.useMutation();
  const { mutateAsync: mutateBool } = api.user.updateIsFirstLogin.useMutation();

  useEffect(() => {
    if (session) {
      setName(session.user?.name ?? "");
    }
  }, [session])
  
  const handleRegister = async (event : FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await mutateName({ name });
    const bool = false;
    await mutateBool({ bool });

    await router.push('/interestTags');
  }

  if (session) {
    return (
      <div className="w-80 m-auto">
        <ProfileImage src={session.user?.image ? session.user?.image : "/default.png"} classNames="m-auto w-24 h-24"/>
        <form onSubmit={handleRegister}>
          <label 
            htmlFor="name"
            style={{fontFamily: "NanumSquareRoundEB", fontSize: "14px", color: "rgba(255, 255, 255, 0.35)" }}
            className="w-80 mb-1"
          >
            이름이 무엇인가요?
          </label>
          <input 
            type="text" 
            name="name" 
            value={name}
            style={{backgroundColor: "rgba(255, 255, 255, 0.35)", fontFamily: "NanumSquareRoundEB", fontSize: "14px"}}
            className="rounded-xl w-80 h-11 p-4 text-primary"
            onChange={(event)=> {setName(event.target.value)}}
          />
          <button 
            type="submit"
            className="w-80 h-11 text-center bg-primary text-white rounded-xl fixed bottom-20 left-1/2 -ml-40"
            style={{fontFamily: "NanumSquareRound", fontSize: "15px",}}
          >
            다음
          </button>
        </form>
      </div>
    );
  } 
  else {
    return <></>
  }
}

export default Register;