type Props = { name: string; bio: string; image: string | null };

export default function ProfileHeader({ name, bio, image }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={`${name} 프로필 사진`}
          className="h-28 w-28 rounded-full object-cover shadow-md sm:h-32 sm:w-32"
        />
      ) : (
        <div
          aria-label={`${name} 프로필 사진`}
          className="flex h-28 w-28 items-center justify-center rounded-full bg-emerald-600 text-4xl font-bold text-white shadow-md sm:h-32 sm:w-32"
        >
          {name.charAt(0)}
        </div>
      )}
      <h1 className="mt-5 text-2xl font-bold">{name}</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">{bio}</p>
    </header>
  );
}
