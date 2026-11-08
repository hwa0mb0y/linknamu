import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { getClickCounts } from "@/lib/mongodb";
import { links, profile } from "@/lib/profile";

// 클릭 수를 항상 최신으로 보여주기 위해 동적 렌더링
export const dynamic = "force-dynamic";

export default async function Home() {
  const counts = await getClickCounts();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-14">
      <ThemeToggle />
      <ProfileHeader
        name={profile.name}
        bio={profile.bio}
        image={profile.image}
      />
      <ul className="mt-10 flex flex-col gap-4">
        {links.map((link) => (
          <li key={link.id}>
            <LinkCard link={link} initialCount={counts[link.id] ?? 0} />
          </li>
        ))}
      </ul>
    </main>
  );
}
