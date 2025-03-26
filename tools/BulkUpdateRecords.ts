import { db } from "../util/db.js";
import { Collection } from "@datastax/astra-db-ts";

type BulkUpdateRecordsArgs = {
  collectionName: string;
  records: Array<{
    id: string;
    record: Record<string, any>;
  }>;
};

type BulkUpdateRecordsResult = {
  message: string;
  updatedCount: number;
};

export async function BulkUpdateRecords({
  collectionName,
  records,
}: BulkUpdateRecordsArgs): Promise<BulkUpdateRecordsResult> {
  const collection: Collection = db.collection(collectionName);

  const updatePromises = records.map(({ id, record }) =>
    collection.updateOne({ _id: id }, { $set: record })
  );

  const results = await Promise.all(updatePromises);
  const updatedCount = results.reduce(
    (count, result) => count + (result.modifiedCount || 0),
    0
  );

  return {
    message: `Successfully updated ${updatedCount} records`,
    updatedCount,
  };
}
