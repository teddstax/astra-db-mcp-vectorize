import { db } from "../util/db.js";

export async function CreateCollection(params: {
  collectionName: string;
  vector?: boolean;
  dimension?: number;
}) {
  const { collectionName, vector = true, dimension = 1536 } = params;

  if (vector) {
    await db.createCollection(collectionName, {
      vector: {
        dimension: dimension,
      },
    });
  } else {
    await db.createCollection(collectionName);
  }

  return {
    success: true,
    message: `Collection '${collectionName}' created successfully`,
  };
}
