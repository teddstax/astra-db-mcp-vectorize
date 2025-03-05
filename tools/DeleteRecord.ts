import { db } from "../util/db.js";

export async function DeleteRecord(params: {
  collectionName: string;
  recordId: string;
}) {
  const { collectionName, recordId } = params;

  const collection = db.collection(collectionName);
  const result = await collection.deleteOne({ _id: recordId });

  if (result.deletedCount === 0) {
    throw new Error(
      `Record with ID '${recordId}' not found in collection '${collectionName}'`
    );
  }

  return {
    success: true,
    message: `Record '${recordId}' deleted successfully from collection '${collectionName}'`,
  };
}
