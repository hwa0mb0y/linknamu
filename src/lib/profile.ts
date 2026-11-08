export type LinkItem = {
  id: string;
  title: string;
  description?: string;
  url: string;
};

export const profile = {
  name: "박보람",
  bio: "개발자를 꿈꾸는 인문학자",
  // public/ 아래 이미지 경로 (예: "/profile.jpg"). 없으면 이름 첫 글자를 보여줍니다.
  image: "/profile.jpg" as string | null,
};

// 링크를 추가/수정하려면 이 목록만 고치면 됩니다. id는 클릭 수 집계 키이므로 바꾸지 마세요.
export const links: LinkItem[] = [
  {
    id: "github",
    title: "GitHub",
    description: "코드와 프로젝트",
    url: "https://github.com/hwa0mb0y",
  },
  {
    id: "blog",
    title: "블로그",
    description: "배우고 기록한 것들",
    url: "https://sudhana.tistory.com/",
  },
  {
    id: "academia",
    title: "Academia",
    description: "연구와 논문",
    url: "https://chungbuk.academia.edu/ParkBoram",
  },
];
