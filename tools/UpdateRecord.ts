import { db } from "../util/db.js";

export async function UpdateRecord(params: {
  collectionName: string;
  recordId: string;
  record: Record<string, any>;
}) {
  const { collectionName, recordId, record } = params;

  const collection = db.collection(collectionName);

  // Remove _id from the record if it exists, as it cannot be updated
  const updateData = { ...record };
  delete updateData._id;

  const result = await collection.updateOne(
    { _id: recordId },
    { $set: updateData }
  );

  if (result.matchedCount === 0) {
    throw new Error(
      `Record with ID '${recordId}' not found in collection '${collectionName}'`
    );
  }

  return {
    success: true,
    message: `Record '${recordId}' updated successfully in collection '${collectionName}'`,
  };
}
