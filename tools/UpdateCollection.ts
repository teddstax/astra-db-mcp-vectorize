import { db } from "../util/db.js";

export async function UpdateCollection(params: {
  collectionName: string;
  newName: string;
}) {
  const { collectionName, newName } = params;

  // Check if source collection exists
  const collections = await db.listCollections();
  const sourceCollectionExists = collections.some(
    (collection) => collection.name === collectionName
  );

  if (!sourceCollectionExists) {
    throw new Error(`Collection '${collectionName}' does not exist`);
  }

  // Check if target collection already exists
  const targetCollectionExists = collections.some(
    (collection) => collection.name === newName
  );

  if (targetCollectionExists) {
    throw new Error(`Collection '${newName}' already exists`);
  }

  // Create new collection
  const sourceCollection = db.collection(collectionName);
  // Get the source collection info to preserve settings
  const collectionInfo = await sourceCollection.find({}).limit(1).toArray();
  const hasVectors =
    collectionInfo.length > 0 && collectionInfo[0].$vector !== undefined;

  // Create the new collection with the same settings
  if (hasVectors) {
    const vectorDimension = collectionInfo[0].$vector.length;
    await db.createCollection(newName, {
      vector: {
        dimension: vectorDimension,
      },
    });
  } else {
    await db.createCollection(newName);
  }

  // Copy data
  const targetCollection = db.collection(newName);
  const documents = await sourceCollection.find({}).toArray();

  if (documents.length > 0) {
    await targetCollection.insertMany(documents);
  }

  // Delete the old collection
  await db.dropCollection(collectionName);

  return {
    success: true,
    message: `Collection '${collectionName}' renamed to '${newName}' successfully`,
  };
}
