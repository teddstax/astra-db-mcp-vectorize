import { db } from "../util/db.js";
import { Collection } from "@datastax/astra-db-ts";

type BulkCreateRecordsArgs = {
  collectionName: string;
  records: Record<string, any>[];
};

type BulkCreateRecordsResult = {
  message: string;
  ids: string[];
};

export async function BulkCreateRecords({
  collectionName,
  records,
}: BulkCreateRecordsArgs): Promise<BulkCreateRecordsResult> {
  const collection: Collection = db.collection(collectionName);

  const insertPromises = records.map((record) => collection.insertOne(record));
  const results = await Promise.all(insertPromises);
  const ids = results
    .map((result) => result.insertedId?.toString() || "")
    .filter((id) => id !== "");

  return {
    message: `Successfully created ${ids.length} records`,
    ids,
  };
}
