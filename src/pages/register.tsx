import { useSession } from "next-auth/react";
import { FormEvent, useEffect } from "react";
import { api } from "../utils/api";
import { ProfileImage } from "../components/profileImage";
import { useRouter } from "next/router";

const Register = () => {
  const { data: session } = useSession();
  const router = useRouter();
  //const { mutate } = api.user.updateName.useMutation();
  
  const handleRegister = (event : FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  if (session) {
    return (
      <div className="w-80 m-auto">
        <ProfileImage src={session.user?.image ? session.user?.image : "/default.png"} classNames="m-auto w-24 h-24"/>
        <form onSubmit={handleRegister}>
          <label 
            htmlFor="name"
            style={{fontFamily: "NanumSquareRoundEB", fontSize: "14px", color: "rgba(255, 255, 255, 0.35)" }}
            className="w-80 mb-1 w-"
          >
            이름이 무엇인가요?
          </label>
          <input 
            type={"text"} 
            name="name" 
            value={session.user?.name ? session.user?.name : ""}
            style={{backgroundColor: "rgba(255, 255, 255, 0.35)", fontFamily: "NanumSquareRoundEB", fontSize: "14px"}}
            className="rounded-xl w-80 h-11 p-4 text-primary"
          />
        </form>
      </div>
    );
  } 
  else {
    return <></>
  }
}

export default Register;