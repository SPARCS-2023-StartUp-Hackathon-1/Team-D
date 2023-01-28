import { type NextPage } from "next";
import Image from "next/image";
import { ProfileImage } from "../components/profileImage";

/* const CloudTop = () => { */
/*   return <div width={100} height={100} alt="" className="bg-local" style="background-image: url('cloud1.png')"/> */
/* } */
/**/
/* const CloudBottom = () => { */
/*   return <div width={100} height={100} alt="" className="bg-local" style="background-image: url('cloud1.png')"/> */
/* } */

const Home: NextPage = () => {
  /* const { data: session, status } = useSession(); */
  /* const router = useRouter(); */

  /* useEffect(() => { */
  /*   // 로딩중일때 글로벌 오버레이로 로고 띄우기... */
  /*   /*  */
  /*   if (status === "loading" || isLoading) { */
  /*     return <Image src = "/favicon.ico" alt = "logo" width={100} height={100}/>; */
  /*   } */
  /*   */ 
  /*   if (!session) { */
  /*     void router.push("/login"); */
  /*   } */
  /*   else { */
  /*     const { data: user, isLoading } = api.user.getUserBySession.useQuery(); */
  /*     if (user?.isFirstLogin){ */
  /*       void router.push("/registerUser"); */
  /*     } */
  /*   } */
  /* }, [router]) */

  return <div className="flex flex-col w-full px-9">
    {/* <CloudTop/> */}
    <div className="flex items-center">
      <ProfileImage src="/favicon.ico"/>
    
      <div className="flex flex-col">
        <div>
          <span style={{fontFamily: 'NanumSquareRoundEB', fontSize: '28px'}}>정인님</span>
          <span style={{fontFamily: 'NanumSquareRoundEB', fontSize: '16px'}}>이</span>
        </div>
        <span style={{fontFamily: 'NanumSquareRoundEB', fontSize: '16px'}}>행복을 담아 전달할 풍선 꾸러미</span>
      </div>
    </div>
    <span className="w-full bg-white lg:w-1/3" style={{padding: "1px"}}></span>
  
    {/* <div> */}
    {/*   <Image className="mb-12 mx-auto p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src = "/favicon.ico" alt = "logo" width={80} height={80} /> */}
    {/* </div> */}
    {/* <CloudBottom/> */}
  </div>;
};

export default Home;
