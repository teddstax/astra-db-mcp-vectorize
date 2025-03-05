import { describe, it, expect, beforeEach, vi } from "vitest";
import { GetCollections } from "../../tools/GetCollections.js";
import { db } from "../../util/db.js";

// Make TypeScript happy with the mocked module
const mockDb = db as unknown as {
  listCollections: ReturnType<typeof vi.fn>;
};

describe("GetCollections Tool", () => {
  beforeEach(() => {
    // Clear mock call history before each test
    vi.clearAllMocks();
  });

  it("should return a list of collections", async () => {
    // Call the function
    const result = await GetCollections();

    // Verify the mock was called
    expect(mockDb.listCollections).toHaveBeenCalledTimes(1);

    // Verify the result
    expect(result).toEqual([
      { name: "test_collection1", type: "vector" },
      { name: "test_collection2", type: "document" },
    ]);
  });
});
