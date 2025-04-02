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

// export async function CreateCollection(params: {
//   collectionName: string;
//   vector?: boolean;
//   dimension?: number;
// }) {
//   const { collectionName, vector = true, dimension = 1536 } = params;

//   if (vector) {
//     await db.createCollection(collectionName, {
//       vector: {
//         dimension: dimension,
//       },
//     });
//   } else {
//     await db.createCollection(collectionName);
//   }

//   return {
//     success: true,
//     message: `Collection '${collectionName}' created successfully`,
//   };
// }

import { db } from "../util/db.js";
import { Collection } from "@datastax/astra-db-ts";

type CreateCollectionArgs = {
  collectionName: string;
  modelName: string; // e.g., "text-embedding-ada-002"
  dimensions: number; // e.g., 1536 for ada-002
  apiKeyName: string; // Name of the OpenAI API key in Astra DB
  provider: string; 
};

export async function CreateCollection({
  collectionName,
  modelName,
  dimensions,
  apiKeyName,
  provider,
}: CreateCollectionArgs): Promise<Collection> {
  try {
    const collection = await db.createCollection(collectionName, {
      vector: {
        dimension: dimensions, // Set the correct number of dimensions for the model
        metric: "COSINE", // Default similarity metric (can also be DOT_PRODUCT or EUCLIDEAN)
        service: {
          provider, // Specify OpenAI as the provider
          modelName, // Model name (e.g., "text-embedding-ada-002")
          authentication: {
            providerKey: apiKeyName, // Name of the API key in Astra DB
          },
        },
      },
    });

    console.log(`Successfully created collection: ${collection.collectionName}`);
    return collection;
  } catch (error) {
    console.error(`Failed to create collection: ${error.message}`);
    throw error;
  }
}

