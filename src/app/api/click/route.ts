import { NextResponse } from "next/server";
import { links } from "@/lib/profile";
import { getClickCounts, getClicksCollection } from "@/lib/mongodb";

// GET이 정적으로 캐시되지 않도록 항상 동적 실행
export const dynamic = "force-dynamic";

/** 모든 링크의 현재 클릭 수를 한 번에 반환: { [id]: count } */
export async function GET() {
  const counts = await getClickCounts();
  return NextResponse.json(counts, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const id = body?.id;

  // 등록된 링크 id만 허용
  if (typeof id !== "string" || !links.some((l) => l.id === id)) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }

  try {
    const col = await getClicksCollection();
    if (!col) return NextResponse.json({ ok: false }, { status: 503 });
    const res = await col.findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    return NextResponse.json({ ok: true, count: res?.count ?? 1 });
  } catch (e) {
    console.error("클릭 수 저장 실패", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
