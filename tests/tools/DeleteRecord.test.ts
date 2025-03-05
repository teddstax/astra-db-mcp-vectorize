import { describe, it, expect, beforeEach } from "vitest";
import { DeleteRecord } from "../../tools/DeleteRecord.js";
import { mockDb } from "../mocks/db.mock";

// Import the mock to ensure it's applied
import "../mocks/db.mock";

describe("DeleteRecord Tool", () => {
  beforeEach(() => {
    // Clear mock call history before each test
    mockDb.collection.mockClear();
  });

  it("should delete a record from a collection", async () => {
    const collectionName = "test_collection1";
    const recordId = "1";

    const mockCollection = mockDb.collection(collectionName);

    // Call the function
    const result = await DeleteRecord({
      collectionName,
      recordId,
    });

    // Verify the mocks were called correctly
    expect(mockDb.collection).toHaveBeenCalledTimes(1);
    expect(mockDb.collection).toHaveBeenCalledWith(collectionName);
    expect(mockCollection.deleteOne).toHaveBeenCalledTimes(1);
    expect(mockCollection.deleteOne).toHaveBeenCalledWith({ _id: recordId });

    // Verify the result
    expect(result).toEqual({
      _id: recordId,
      deleted: true,
    });
  });
});
