import { db } from "../util/db.js";

export async function CreateRecord(params: {
  collectionName: string;
  record: Record<string, any>;
}) {
  const { collectionName, record } = params;

  const collection = db.collection(collectionName);
  const result = await collection.insertOne(record);

  return {
    success: true,
    id: result.insertedId,
    message: `Record created successfully in collection '${collectionName}'`,
  };
}
