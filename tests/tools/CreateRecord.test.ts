import { describe, it, expect, beforeEach } from "vitest";
import { CreateRecord } from "../../tools/CreateRecord.js";
import { mockDb } from "../mocks/db.mock";

// Import the mock to ensure it's applied
import "../mocks/db.mock";

describe("CreateRecord Tool", () => {
  beforeEach(() => {
    // Clear mock call history before each test
    mockDb.collection.mockClear();
  });

  it("should create a record in a collection", async () => {
    const collectionName = "test_collection1";
    const record = {
      title: "New Record",
      content: "This is a new record",
      vector: [0.7, 0.8, 0.9],
    };

    const mockCollection = mockDb.collection(collectionName);

    // Call the function
    const result = await CreateRecord({
      collectionName,
      record,
    });

    // Verify the mocks were called correctly
    expect(mockDb.collection).toHaveBeenCalledTimes(1);
    expect(mockDb.collection).toHaveBeenCalledWith(collectionName);
    expect(mockCollection.insertOne).toHaveBeenCalledTimes(1);
    expect(mockCollection.insertOne).toHaveBeenCalledWith(record);

    // Verify the result
    expect(result).toEqual({
      ...record,
      _id: "new-id", // This is the ID our mock returns
    });
  });

  it("should create a record with a specified ID", async () => {
    const collectionName = "test_collection1";
    const record = {
      _id: "custom-id",
      title: "Record with Custom ID",
      content: "This record has a custom ID",
      vector: [0.7, 0.8, 0.9],
    };

    const mockCollection = mockDb.collection(collectionName);

    // Call the function
    const result = await CreateRecord({
      collectionName,
      record,
    });

    // Verify the mocks were called correctly
    expect(mockDb.collection).toHaveBeenCalledTimes(1);
    expect(mockDb.collection).toHaveBeenCalledWith(collectionName);
    expect(mockCollection.insertOne).toHaveBeenCalledTimes(1);
    expect(mockCollection.insertOne).toHaveBeenCalledWith(record);

    // Verify the result
    expect(result).toEqual({
      ...record,
      _id: "custom-id", // The ID should be preserved
    });
  });
});
