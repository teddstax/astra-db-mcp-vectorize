import { db } from "../util/db.js";

export async function GetRecord(params: {
  collectionName: string;
  recordId: string;
}) {
  const { collectionName, recordId } = params;

  const collection = db.collection(collectionName);
  const record = await collection.findOne({ _id: recordId });

  if (!record) {
    throw new Error(
      `Record with ID '${recordId}' not found in collection '${collectionName}'`
    );
  }

  return record;
}
