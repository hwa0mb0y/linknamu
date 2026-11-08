"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // 초기 클래스는 layout의 인라인 스크립트가 이미 적용함 → 상태만 동기화
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "밝은 화면으로 전환" : "어두운 화면으로 전환"}
      className="fixed right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-lg shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
    >
      <span aria-hidden>{dark ? "☀️" : "🌙"}</span>
    </button>
  );
}
