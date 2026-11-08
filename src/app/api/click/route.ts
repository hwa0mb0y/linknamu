import { NextResponse } from "next/server";
import { links } from "@/lib/profile";
import { getClicksCollection } from "@/lib/mongodb";

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
