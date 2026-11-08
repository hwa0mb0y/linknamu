"use client";

import { useState } from "react";
import type { LinkItem } from "@/lib/profile";

type Props = { link: LinkItem; initialCount: number };

export default function LinkCard({ link, initialCount }: Props) {
  const [count, setCount] = useState(initialCount);

  function handleClick() {
    // 페이지 이동과 무관하게 전송되도록 keepalive 사용
    setCount((c) => c + 1);
    fetch("/api/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: link.id }),
      keepalive: true,
    }).catch(() => {});
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <span className="min-w-0">
        <span className="block truncate font-semibold">{link.title}</span>
        {link.description && (
          <span className="block truncate text-sm text-neutral-500 dark:text-neutral-400">
            {link.description}
          </span>
        )}
      </span>
      <span
        className="shrink-0 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
        aria-label={`클릭 ${count}회`}
      >
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
