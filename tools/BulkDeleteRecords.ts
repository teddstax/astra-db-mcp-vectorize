import { db } from "../util/db.js";
import { Collection } from "@datastax/astra-db-ts";

type BulkDeleteRecordsArgs = {
  collectionName: string;
  recordIds: string[];
};

type BulkDeleteRecordsResult = {
  message: string;
  deletedCount: number;
};

export async function BulkDeleteRecords({
  collectionName,
  recordIds,
}: BulkDeleteRecordsArgs): Promise<BulkDeleteRecordsResult> {
  const collection: Collection = db.collection(collectionName);

  const deletePromises = recordIds.map((id) =>
    collection.deleteOne({ _id: id })
  );

  const results = await Promise.all(deletePromises);
  const deletedCount = results.reduce(
    (count, result) => count + (result.deletedCount || 0),
    0
  );

  return {
    message: `Successfully deleted ${deletedCount} records`,
    deletedCount,
  };
}
