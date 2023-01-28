import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const delay = 5;

const Greeting = () => {
  const router = useRouter();
  const [state, setState] = useState(true);
  const [anime, setAnime] = useState(true);

  useEffect(()=> {
    setAnime(false);
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {setState(false); void router.push('/');}, delay * 1000);

    return () => {
      clearTimeout(timeout);
      //void router.push('/');
    }
  }, []);

  return (
    <div className="m-auto" style={anime ? {
      opacity: 1,
      transition: "opacity 7s"
    } : {
      opacity: 0,
      transition: "opacity 7s",
    }}>
      <p className="text-primary" style={{fontFamily: "NanumSquareRoundEB", fontSize: "28px"}}>특별한 날을<br/> <span style={{color: "#F58807"}}>Giftoo</span>와 함께<br/> 의미있게 축하해보세요!</p>
    </div>
  )
}

export default Greeting;