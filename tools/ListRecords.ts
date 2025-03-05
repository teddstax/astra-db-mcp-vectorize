import { db } from "../util/db.js";

export async function ListRecords(params: {
  collectionName: string;
  limit?: number;
}) {
  const { collectionName, limit = 10 } = params;

  const collection = db.collection(collectionName);
  const records = await collection.find({}).limit(limit).toArray();

  return records;
}
