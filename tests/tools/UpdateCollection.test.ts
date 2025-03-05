import { describe, it, expect, beforeEach } from "vitest";
import { UpdateCollection } from "../../tools/UpdateCollection.js";
import { mockDb } from "../mocks/db.mock";

// Import the mock to ensure it's applied
import "../mocks/db.mock";

describe("UpdateCollection Tool", () => {
  beforeEach(() => {
    // Clear mock call history before each test
    mockDb.updateCollection.mockClear();
  });

  it("should update a collection name", async () => {
    const oldName = "old_collection";
    const newName = "new_collection";

    // Call the function
    const result = await UpdateCollection({
      collectionName: oldName,
      newName: newName,
    });

    // Verify the mock was called with correct parameters
    expect(mockDb.updateCollection).toHaveBeenCalledTimes(1);
    expect(mockDb.updateCollection).toHaveBeenCalledWith(oldName, newName);

    // Verify the result
    expect(result).toEqual({
      oldName,
      newName,
    });
  });
});
