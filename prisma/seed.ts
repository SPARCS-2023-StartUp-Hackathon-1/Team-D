import { PrismaClient, Tag } from "@prisma/client";
const prisma = new PrismaClient();

const DEST_TO_CREATE = 5;

const names = ["유니세프", "컴패션", "초록우산", "세이브더칠드런", "국경없는의사회"];
const urls = ["https://www.unicef.or.kr/", "https://www.compassion.or.kr/about-us/about/", "https://www.childfund.or.kr/intro/about.do", "https://www.sc.or.kr/intro/intro.do", "https://msf.or.kr/"];
const explanation = ["UNICEF에 따르면 3억 5천 6백만명의 어린이들이 하루에 1.9달러 미만으로 거주하고 있다고 해요.", "WHO에 따르면 저소득 국가 6명 중 1명은 초등교육을 미수한다고 해요."];
const intro = ["어린이를 직접 양육하는 기관을 설립하기 위한 기금을 조성합니다. 주로 건강검진, 전문 인력 양성, 시설비에 사용됩니다.", "어린이가 꿈을 이룰 수 있도록 특별 교육을 지원합니다. 주로 직업 교육, 문맹 퇴치, 학용품 지원에 사용됩니다."];

async function run() {
  const tags = [Tag.CULTURE, Tag.EDUCATION, Tag.ENVIRONMENT, Tag.LABOR, Tag.POVERTY, Tag.WAR, Tag.WELFARE];

  const destData = [];
  for (let i = 0; i < DEST_TO_CREATE; i++) {
    destData.push({
      name: names[i] ?? "",
      tags: tags.filter((a)=> {return Math.random() > 0.7}),
      url: urls[i] ?? "",
      introduction: intro[i] ?? "no introduction",
      explanation: explanation[i] ?? "no explanation",
    })
  }

  const createDest = destData.map((dest) => 
    prisma.donateDestination.create({ data: dest })
  );

  await prisma.$transaction(createDest);

  await prisma.$disconnect();
}

run();