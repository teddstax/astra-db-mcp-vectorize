// Copyright DataStax, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// import { db } from "../util/db.js";

// export async function CreateRecord(params: {
//   collectionName: string;
//   record: Record<string, any>;
// }) {
//   const { collectionName, record } = params;

//   const collection = db.collection(collectionName);
//   const result = await collection.insertOne(record);

//   return {
//     success: true,
//     id: result.insertedId,
//     message: `Record created successfully in collection '${collectionName}'`,
//   };
// }


import { db } from "../util/db.js";
import { Collection } from "@datastax/astra-db-ts";

type CreateRecordArgs = {
  collectionName: string;
  record: Record<string, any>;
};

type CreateRecordResult = {
  message: string;
  id: string;
};

export async function CreateRecord({
  collectionName,
  record,
}: CreateRecordArgs): Promise<CreateRecordResult> {
  const collection: Collection = db.collection(collectionName);

  // Concatenate all field values into a single string
  const concatenatedFields = Object.values(record)
    .filter((value) => typeof value === "string" || typeof value === "number") // Include only strings and numbers
    .join(" "); // Use space as a delimiter

  // Add $vectorize field for automatic vectorization
  const vectorizedRecord = {
    ...record,
    $vectorize: concatenatedFields,
  };

  // Insert the record into the collection
  const result = await collection.insertOne(vectorizedRecord);

  return {
    message: "Successfully created record",
    id: result.insertedId?.toString() || "",
  };
}
