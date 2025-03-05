import { describe, it, expect, beforeEach } from "vitest";
import { UpdateRecord } from "../../tools/UpdateRecord.js";
import { mockDb } from "../mocks/db.mock";

// Import the mock to ensure it's applied
import "../mocks/db.mock";

describe("UpdateRecord Tool", () => {
  beforeEach(() => {
    // Clear mock call history before each test
    mockDb.collection.mockClear();
  });

  it("should update a record in a collection", async () => {
    const collectionName = "test_collection1";
    const recordId = "1";
    const record = {
      title: "Updated Record",
      content: "This record has been updated",
      vector: [0.7, 0.8, 0.9],
    };

    const mockCollection = mockDb.collection(collectionName);

    // Call the function
    const result = await UpdateRecord({
      collectionName,
      recordId,
      record,
    });

    // Verify the mocks were called correctly
    expect(mockDb.collection).toHaveBeenCalledTimes(1);
    expect(mockDb.collection).toHaveBeenCalledWith(collectionName);
    expect(mockCollection.updateOne).toHaveBeenCalledTimes(1);
    expect(mockCollection.updateOne).toHaveBeenCalledWith(
      { _id: recordId },
      record
    );

    // Verify the result
    expect(result).toEqual({
      ...record,
      _id: recordId,
    });
  });
});
