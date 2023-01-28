import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { api } from '../../utils/api';
import Image from 'next/image';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '../../components/button';
import { env } from '../../env/client.mjs';

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { data: user } = api.user.getUserBySession.useQuery(
    undefined, // no input
    { enabled: session?.user !== undefined }
  );
  const router = useRouter();
  const { balloon, donationOrg, targetDate, eventName } = router.query;

  return (
      <div className="flex h-screen w-full flex-col justify-end px-7 py-3">
        <div className="flex items-center fixed top-20">
          <div
            className="flex flex-col"
            style={{ fontSize: '28px' }}
          >
            <span>{user?.name}님의</span>
            <span>{eventName}에</span>
            <span>{donationOrg}으로 전달할</span>
            <span>풍선꾸러미가 만들어졌습니다!</span>
          </div>
        </div>
        {balloon ? (
          <Image
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            src={`/balloon${balloon}.png`}
            width={200}
            height={200}
            alt=""
            className="fixed left-1/4 top-80 -rotate-6 z-0"
          />
        ) : (
          <></>
        )}
        <Button text='링크 복사하기' enabled z_index="z-10" onClick={
          () => {
            navigator.clipboard.writeText(`${env.NEXT_PUBLIC_BASE_URL}/pay?donaition_org=${donationOrg?.toString()??""}&event_name=${eventName?.toString()??""}`).then(() => {
              alert('클립보드에 링크가 복사되었습니다.')
            }).catch((_) => {
              alert('복사에 실패하였습니다');

            });
          }
        }

        />
        <Button text='인스타그램 스토리로 공유하기' enabled z_index="z-10"/>
      </div>
  );
};

export default Home;
