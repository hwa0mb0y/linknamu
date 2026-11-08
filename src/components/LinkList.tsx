"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/lib/profile";

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 데이터를 받기 전에는 비어 있으므로 모든 카드가 0회로 표시된다
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    fetch("/api/click", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : {}))
      .then((data: Record<string, number>) => {
        // 응답 전에 이미 눌러서 올라간 값이 있으면 더 큰 쪽을 유지
        if (!cancelled)
          setCounts((prev) => {
            const next = { ...data };
            for (const [id, n] of Object.entries(prev))
              next[id] = Math.max(next[id] ?? 0, n);
            return next;
          });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  function handleClick(id: string) {
    setCounts((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  }

  return (
    <ul className="mt-10 flex flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            link={link}
            count={counts[link.id] ?? 0}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
