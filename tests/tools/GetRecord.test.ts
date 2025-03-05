import { describe, it, expect, beforeEach } from "vitest";
import { GetRecord } from "../../tools/GetRecord.js";
import { mockDb } from "../mocks/db.mock";

// Import the mock to ensure it's applied
import "../mocks/db.mock";

describe("GetRecord Tool", () => {
  beforeEach(() => {
    // Clear mock call history before each test
    mockDb.collection.mockClear();
  });

  it("should get a record by ID", async () => {
    const collectionName = "test_collection1";
    const recordId = "1";
    const mockCollection = mockDb.collection(collectionName);

    // Call the function
    const result = await GetRecord({
      collectionName,
      recordId,
    });

    // Verify the mocks were called correctly
    expect(mockDb.collection).toHaveBeenCalledTimes(1);
    expect(mockDb.collection).toHaveBeenCalledWith(collectionName);
    expect(mockCollection.findOne).toHaveBeenCalledTimes(1);
    expect(mockCollection.findOne).toHaveBeenCalledWith({ _id: recordId });

    // Verify the result
    expect(result).toEqual({
      _id: "1",
      title: "Record 1",
      content: "Content 1",
      vector: [0.1, 0.2, 0.3],
    });
  });

  it("should return null for a non-existent record", async () => {
    const collectionName = "test_collection1";
    const recordId = "non_existent_id";
    const mockCollection = mockDb.collection(collectionName);

    // Mock the findOne method to return null for this specific test
    mockCollection.findOne.mockResolvedValueOnce(null);

    // Call the function
    const result = await GetRecord({
      collectionName,
      recordId,
    });

    // Verify the mocks were called correctly
    expect(mockDb.collection).toHaveBeenCalledTimes(1);
    expect(mockDb.collection).toHaveBeenCalledWith(collectionName);
    expect(mockCollection.findOne).toHaveBeenCalledTimes(1);
    expect(mockCollection.findOne).toHaveBeenCalledWith({ _id: recordId });

    // Verify the result is null
    expect(result).toBeNull();
  });
});
