import { Tag } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { useRouter } from "next/router";

const checkStyle = "opacity-50"

const tags : string[] =  Object.keys(Tag).filter((v) => isNaN(Number(v)));


const Category = ({value} : {value : string}) => {
  const [checkState, setCheckState] = useState(false);

  return (
    <button 
      className={`w-40 h-11 bg-slate-50 ${checkState ? checkStyle : ""}`}
      onClick={() => setCheckState(!checkState)}
    >
      {value}
    </button>
  );
}

const InterestTags = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { mutate } = api.user.updateTags.useMutation();

  const handleTags = () => {
    const categories = document.getElementsByClassName(checkStyle);
    var input : string[] = [];
    for (let i = 0; i < categories.length; i++){
      if (categories[i] !== undefined){
        mutate({ tag: categories[i]?.innerHTML ?? "" });
      }
    }

    void router.push('/');
  }

  return (
    <div className="w-80 h-screen m-auto">
      <p className="text-primary mt-20" style={{fontFamily: "NanumSquareRoundEB", fontSize: "28px"}}>{session && `${session.user?.name ?? ""}`}님이 관심있는 <br/>기부 영역은 무엇인가요?</p>
      <div className="mt-10 flex flex-col items-center h-1/2 mb-32 justify-evenly">
        {tags.map((value, index) => {
          return <Category key={index} value={value} />;
        })}
      </div>
      <button 
        type="button"
        className="w-80 h-11 text-center bg-primary text-white rounded-xl fixed bottom-20 left-1/2 -ml-40"
        onClick={handleTags}
        style={{fontFamily: "NanumSquareRound", fontSize: "15px",}}
      >
        Giftoo 시작하기
      </button>
    </div>
  );
}

export default InterestTags;