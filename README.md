# [TEAM D] Giftoo
이 Repository는 SPARCS-2023-StartUp-Hackathon의 웹 프론트, 백엔드를 담당하는 Monorepo입니다. Giftoo는 모바일로 주고 받아 의미를 잃고 낭비되는 선물을 기부금의 형태로 받아 기부처에 전달하는 이벤트 기부 플랫폼입니다.

다음과 같은 기능이 포함되어 있습니다.
- 카카오를 통한 회원 관리 및 이벤트 생성
- 생성된 이벤트에 대한 공유 기능
- 카카오페이를 이용한 각 이벤트의 결제 기능


## 프로젝트에서 사용한 기술

본 repository는 `package.json`에 있는 오픈소스 패키지를 사용하였으며, t3 stack을 이용하여 제작되었습니다.
- https://create.t3.gg/

## Dev Server 실행 방법

1. 본 repository를 로컬 환경에 clone 받습니다.
2. `npm install`로 필요한 패키지를 설치 합니다.
3. `.env.example`을 `.env`로 복사한 다음, 아래 [환경 변수 및 시크릿] 규약에 따라 작성합니다.
4. `npx prisma db push`
5. `npm run dev`로 개발환경을 실행합니다.


## Production 배포 방법

1. 본 repository를 fork합니다.
2. [vercel](https://vercel.com/)에 로그인하여 Git Repository를 Import합니다.
3. Configure Project 단계에서 Environment Variable에 아래 [환경 변수 및 시크릿] 규약에 따라 .env에 들어갈 내용을 넣어줍니다. (넘어가더라도, 추후 Setting - Environment Variabled에서 수정할 수 있습니다.)
4. Deploy 버튼을 클릭합니다.


## 환경 변수 및 시크릿

아래 항목을 .env 파일에 작성합니다.

### Next.js 및 DB 설정
* NEXT_PUBLIC_BASE_URL : BASE_URL이 되는 도메인을 입력합니다. 개발 환경의 경우 http://localhost:3000 을 입력합니다.
* NEXTAUTH_URL : 위와 마찬가지로 BASE_URL을 입력합니다.
* NEXTAUTH_SECRET : 시크릿 키를 입력합니다.
* DATABASE_URL : 데이터베이스의 URL을 입력합니다.

### 카카오 개발자 설정
* APP_ADMIN_KEY : 카카오 개발자 (https://developers.kakao.com) 에서 생성한 어플리케이션의 Admin 키를 입력합니다.
* KAKAO_CLIENT_ID : 카카오 개발자 어플리케이션의 REST API 키를 입력합니다.
* KAKAO_CLIENT_SECRET : 내 애플리케이션 > 제품 설정 > 카카오 로그인 > 보안에서 Client Secret을 생성하고 입력합니다.

위 항목과 별개로, 카카오 개발자 콘솔 페이지에서 내 애플리케이션 > 카카오 로그인에서 활성화 설정을 하고, Redirect URI에 {BASE_URL}/api/auth/callback/kakao 를 추가합니다. (ex. 개발 환경이라면 http://localhost:3000/api/auth/callback/kakao 를 추가해줍니다.)


## 기타

… 기타 설명이 필요한 사항들 …
