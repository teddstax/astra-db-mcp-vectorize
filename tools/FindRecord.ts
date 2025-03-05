import { db } from "../util/db.js";

export async function FindRecord(params: {
  collectionName: string;
  field: string;
  value: string | number | boolean;
  limit?: number;
}) {
  const { collectionName, field, value, limit = 10 } = params;

  const collection = db.collection(collectionName);

  // Handle special case for _id field
  if (field === "_id" || field === "id") {
    try {
      // Try to find by exact ID
      const record = await collection.findOne({ _id: value });
      return record ? [record] : [];
    } catch (error) {
      // If ID lookup fails, fall back to regular search
      console.error("ID lookup failed, falling back to regular search:", error);
    }
  }

  // Create a dynamic query object for the field search
  const query: Record<string, any> = {};

  // Support for searching nested fields using dot notation
  query[field] = value;

  // Perform the search
  const results = await collection.find(query).limit(limit).toArray();

  // If no results found with exact match, try partial text search for string values
  if (results.length === 0 && typeof value === "string") {
    try {
      // Create a regex pattern for partial matching
      // Escape special regex characters in the search value
      const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regexPattern = new RegExp(escapedValue, "i"); // 'i' for case-insensitive

      const regexQuery: Record<string, any> = {};
      regexQuery[field] = regexPattern;

      return await collection.find(regexQuery).limit(limit).toArray();
    } catch (error) {
      console.error("Regex search failed:", error);
      return [];
    }
  }

  return results;
}
