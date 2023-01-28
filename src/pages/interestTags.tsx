/* eslint-disable */

import { Tag } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { useRouter } from "next/router";
import Image from "next/image";

const checkStyle = "opacity-50"

const tags : string[] =  Object.keys(Tag).filter((v) => isNaN(Number(v)));
console.log(tags)

const balloon : {
  index : number,
  left : number,
  top : number,
  width : number,
  height : number,
  z : number,
  korean: string,
  rotate : string,
}[] = [
  {
    index: 7,
    left: -30,
    top: 80,
    width: 230,
    height: 200,
    z: 50,
    korean: "복지",
    rotate: "-rotate-3",
  },
  {
    index: 6,
    left: -30,
    top: 250,
    width: 250,
    height: 0,
    z: 40,
    korean: "노동",
    rotate: "-rotate-6",
  },
  {
    index: 10,
    left: 30,
    width: 230,
    top: -20,
    height: 200,
    z: 0,
    korean: "교육",
    rotate: "rotate-0"
  }, 
  {
    index: 8,
    left: 70,
    top: 150,
    width: 230,
    height: 200,
    z: 40,
    korean: "빈곤",
    rotate: "-rotate-3",
  },
  {
    index: 9,
    left: 70,
    width: 160,
    top: 330,
    height: 200,
    z: 50,
    korean: "환경",
    rotate: "-rotate-0",
  },
  
  {
    index: 11,
    left: 130,
    width: 210,
    top: 80,
    height: 200,
    z: 0,
    korean: "문화",
    rotate: "rotate-0",
  },
  {
    index: 12,
    left: 140,
    width: 210,
    top: 250,
    height: 200,
    z: 0,
    korean: "전쟁",
    rotate: "rotate-6"
  }
]


const Category = ({index} : {index : number}) => {
  const [checkState, setCheckState] = useState(false);

  return (
    <button 
      onClick={() => setCheckState(!checkState)} 
      className={`absolute ${balloon[index]?.rotate} h-60 w-60 z-${balloon[index]?.z}`}
      style={{left: `${balloon[index]?.left}px`, top: `${balloon[index]?.top}px`}}
      id={`balloon_${index}`}
    >
      <Image
        src={`/balloon${balloon[index]?.index}.png`}
        width={balloon[index]?.width}
        height={balloon[index]?.height}
        alt=""
        style={{pointerEvents: "none", userSelect: "none",}}
      />
    </button>
  );
}

const InterestTags = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { mutate } = api.user.updateTags.useMutation();
  const [input, setInput] = useState<string[]>([]);

  const handleTags = () => {
    for (let i = 0; i < input.length; i++) {
      mutate({tag: input[i] ?? ""});
    }

    void router.push('/greeting');
  }

  const handleClick = (value: string, key: number) => {
    const data = document.getElementById("balloon_" + key);
    if (data !== null) {
      data.classList.toggle(checkStyle);
      if (input.includes(value)){
        setInput(input.filter(a => a !== value));
      }
      else {
        setInput([...input, value]);
      }
    }
  }

  return (
    <div className="w-80 h-screen m-auto">
      <p className="text-primary mt-20" style={{fontFamily: "NanumSquareRoundEB", fontSize: "28px"}}>{session && `${session.user?.name ?? ""}`}님이 관심있는 <br/>기부 영역은 무엇인가요?</p>
      <div className="relative" style={{height: 500}}>
        {tags.map((value, index) => {
          return <Category key={index} index={index} />;
        })}
      </div>
      <div className={`absolute w-40 h-40 text-center`} onClick={()=>{handleClick("LABOR", 0)}} style={{fontSize:"28px", left: "10px", top: "270px"}}><p style={{lineHeight: "160px"}}>노동</p></div>
      <div className={`absolute w-40 h-40 text-center`} onClick={()=>{handleClick("WELFARE", 1)}} style={{fontSize:"28px", left: "3px", top: "430px"}}><p style={{lineHeight: "160px"}}>복지</p></div>
      <div className={`absolute w-40 h-40 text-center`} onClick={()=>{handleClick("ENVIRONMENT", 4)}} style={{fontSize:"28px", left: "100px", top: "510px"}}><p style={{lineHeight: "160px"}}>환경</p></div>
      <div className={`absolute w-40 h-40 text-center`} onClick={()=>{handleClick("POVERTY", 3)}} style={{fontSize:"28px", left: "110px", top: "330px"}}><p style={{lineHeight: "160px"}}>빈곤</p></div>
      <div className={`absolute w-40 h-40 text-center`} onClick={()=>{handleClick("EDUCATION", 2)}} style={{fontSize:"28px", left: "130px", top: "170px"}}><p style={{lineHeight: "160px"}}>교육</p></div>
      <div className={`absolute w-40 h-40 text-center`} onClick={()=>{handleClick("CULTURE", 5)}} style={{fontSize:"28px", left: "210px", top: "270px"}}><p style={{lineHeight: "160px"}}>문화</p></div>
      <div className={`absolute w-40 h-40 text-center`} onClick={()=>{handleClick("WAR", 6)}} style={{fontSize:"28px", left: "220px", top: "440px"}}><p style={{lineHeight: "160px"}}>전쟁</p></div>

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


<div
          className="mt-1, mb-1 flex w-full items-center justify-center"
          style={{
            height: 500
          }}
        >
        </div>