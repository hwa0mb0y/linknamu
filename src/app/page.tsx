import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { links, profile } from "@/lib/profile";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-14">
      <ThemeToggle />
      <ProfileHeader
        name={profile.name}
        bio={profile.bio}
        image={profile.image}
      />
      <LinkList links={links} />
    </main>
  );
}
