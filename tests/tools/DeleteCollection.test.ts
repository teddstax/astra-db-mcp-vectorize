import { describe, it, expect, beforeEach } from "vitest";
import { DeleteCollection } from "../../tools/DeleteCollection.js";
import { mockDb } from "../mocks/db.mock";

// Import the mock to ensure it's applied
import "../mocks/db.mock";

describe("DeleteCollection Tool", () => {
  beforeEach(() => {
    // Clear mock call history before each test
    mockDb.deleteCollection.mockClear();
  });

  it("should delete a collection", async () => {
    const collectionName = "test_collection";

    // Call the function
    const result = await DeleteCollection({
      collectionName,
    });

    // Verify the mock was called with correct parameters
    expect(mockDb.deleteCollection).toHaveBeenCalledTimes(1);
    expect(mockDb.deleteCollection).toHaveBeenCalledWith(collectionName);

    // Verify the result
    expect(result).toEqual({ success: true });
  });
});
