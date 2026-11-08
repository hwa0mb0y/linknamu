import { MongoClient, type Collection } from "mongodb";

export type ClickDoc = { _id: string; count: number };

const globalForMongo = globalThis as unknown as {
  _mongoClient?: Promise<MongoClient>;
};

function getClient(): Promise<MongoClient> | null {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  if (!globalForMongo._mongoClient) {
    globalForMongo._mongoClient = new MongoClient(uri).connect();
  }
  return globalForMongo._mongoClient;
}

/** MONGODB_URI가 없으면 null (클릭 집계 없이 페이지만 동작) */
export async function getClicksCollection(): Promise<Collection<ClickDoc> | null> {
  const client = getClient();
  if (!client) return null;
  const db = (await client).db(process.env.MONGODB_DB || "linknamu");
  return db.collection<ClickDoc>("clicks");
}

export async function getClickCounts(): Promise<Record<string, number>> {
  try {
    const col = await getClicksCollection();
    if (!col) return {};
    const docs = await col.find().toArray();
    return Object.fromEntries(docs.map((d) => [d._id, d.count]));
  } catch (e) {
    console.error("클릭 수 조회 실패", e);
    return {};
  }
}
