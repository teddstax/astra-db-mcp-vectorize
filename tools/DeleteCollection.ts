import { db } from "../util/db.js";

export async function DeleteCollection(params: { collectionName: string }) {
  const { collectionName } = params;

  await db.dropCollection(collectionName);

  return {
    success: true,
    message: `Collection '${collectionName}' deleted successfully`,
  };
}
