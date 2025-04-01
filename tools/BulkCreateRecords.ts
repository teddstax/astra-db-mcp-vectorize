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

  const insertPromises = records.map((record) => {
    // Concatenate all field values into a single string
    const concatenatedFields = Object.values(record)
      .filter((value) => typeof value === "string" || typeof value === "number") // Include only strings and numbers
      .join(" "); // Use space as a delimiter

    // Add $vectorize field for automatic vectorization
    const vectorizedRecord = {
      ...record,
      $vectorize: concatenatedFields,
    };

    return collection.insertOne(vectorizedRecord);
  });

  const results = await Promise.all(insertPromises);
  const ids = results
    .map((result: any) => result.insertedId?.toString() || "")
    .filter((id: string) => id !== "");

  return {
    message: `Successfully created ${ids.length} records`,
    ids,
  };
}
