// Copyright DataStax, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
