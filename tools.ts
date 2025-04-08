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

import type { Schema } from "jsonschema";

export type ToolName =
  | "GetCollections"
  | "CreateCollection"
  | "UpdateCollection"
  | "DeleteCollection"
  | "ListRecords"
  | "GetRecord"
  | "CreateRecord"
  | "UpdateRecord"
  | "DeleteRecord"
  | "FindRecord"
  | "BulkCreateRecords"
  | "BulkUpdateRecords"
  | "BulkDeleteRecords"
  | "OpenBrowser"
  | "HelpAddToClient"
  | "EstimateDocumentCount";

type Tool = {
  name: ToolName;
  description: string;
  inputSchema: Schema;
};

export const tools: Tool[] = [
  {
    name: "GetCollections",
    description: "Get all collections in the Astra DB database",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "CreateCollection",
    description: "Create a new vector-enabled collection in the database with customizable embedding model and provider.",
    inputSchema: {
      type: "object",
      properties: {
        collectionName: {
          type: "string",
          description: "Name of the collection to create",
        },
        modelName: {
          type: "string",
          description: "The name of the embedding model to use (e.g., 'text-embedding-ada-003')",
          default: "text-embedding-ada-003",
        },
        dimensions: {
          type: "number",
          description:
            "The dimensions of the vector space for the collection, based on the embedding model used",
          default: 1536,
        },
        apiKeyName: {
          type: "string",
          description:
            "The name of the API key stored in Astra DB for authenticating with the embedding provider",
          default: "default",
        },
        provider: {
          type: "string",
          description:
            "The embedding service provider (e.g., 'openai', 'nvidia'). Determines how embeddings are generated.",
          default: "openai",
        },
        metric: {
          type: "string",
          description: "The metric to use for the collection",
          default: "cosine",
        },
      },
      required: ["collectionName", "modelName", "dimensions", "apiKeyName", "provider", "metric"],
    },
  },
  
  {
    name: "UpdateCollection",
    description: "Update an existing collection in the database",
    inputSchema: {
      type: "object",
      properties: {
        collectionName: {
          type: "string",
          description: "Name of the collection to update",
        },
        newName: {
          type: "string",
          description: "New name for the collection",
        },
      },
      required: ["collectionName", "newName"],
    },
  },
  {
    name: "DeleteCollection",
    description: "Delete a collection from the database",
    inputSchema: {
      type: "object",
      properties: {
        collectionName: {
          type: "string",
          description: "Name of the collection to delete",
        },
      },
      required: ["collectionName"],
    },
  },
  {
    name: "ListRecords",
    description: "List records from a collection in the database",
    inputSchema: {
      type: "object",
      properties: {
        collectionName: {
          type: "string",
          description: "Name of the collection to list records from",
        },
        limit: {
          type: "number",
          description: "Maximum number of records to return",
          default: 10,
        },
      },
      required: ["collectionName"],
    },
  },
  {
    name: "GetRecord",
    description: "Get a specific record from a collection by ID",
    inputSchema: {
      type: "object",
      properties: {
        collectionName: {
          type: "string",
          description: "Name of the collection to get the record from",
        },
        recordId: {
          type: "string",
          description: "ID of the record to retrieve",
        },
      },
      required: ["collectionName", "recordId"],
    },
  },
  {
    name: "CreateRecord",
    description: "Create a new record in a collection",
    inputSchema: {
      type: "object",
      properties: {
        collectionName: {
          type: "string",
          description: "Name of the collection to create the record in",
        },
        record: {
          type: "object",
          description: "The record data to insert",
        },
      },
      required: ["collectionName", "record"],
    },
  },
  {
    name: "UpdateRecord",
    description: "Update an existing record in a collection",
    inputSchema: {
      type: "object",
      properties: {
        collectionName: {
          type: "string",
          description: "Name of the collection containing the record",
        },
        recordId: {
          type: "string",
          description: "ID of the record to update",
        },
        record: {
          type: "object",
          description: "The updated record data",
        },
      },
      required: ["collectionName", "recordId", "record"],
    },
  },
  {
    name: "DeleteRecord",
    description: "Delete a record from a collection",
    inputSchema: {
      type: "object",
      properties: {
        collectionName: {
          type: "string",
          description: "Name of the collection containing the record",
        },
        recordId: {
          type: "string",
          description: "ID of the record to delete",
        },
      },
      required: ["collectionName", "recordId"],
    },
  },
  {
    name: "FindRecord",
    description: "Find records in a collection by field value",
    inputSchema: {
      type: "object",
      properties: {
        collectionName: {
          type: "string",
          description: "Name of the collection to search in",
        },
        field: {
          type: "string",
          description:
            "Field name to search by (e.g., 'title', '_id', or any property)",
        },
        value: {
          type: "string",
          description: "Value to search for in the specified field",
        },
        limit: {
          type: "number",
          description: "Maximum number of records to return",
          default: 10,
        },
      },
      required: ["collectionName", "field", "value"],
    },
  },
  {
    name: "BulkCreateRecords",
    description: "Create multiple records in a collection at once",
    inputSchema: {
      type: "object",
      properties: {
        collectionName: {
          type: "string",
          description: "Name of the collection to create the records in",
        },
        records: {
          type: "array",
          description: "Array of records to insert",
          items: {
            type: "object",
          },
        },
      },
      required: ["collectionName", "records"],
    },
  },
  {
    name: "BulkUpdateRecords",
    description: "Update multiple records in a collection at once",
    inputSchema: {
      type: "object",
      properties: {
        collectionName: {
          type: "string",
          description: "Name of the collection containing the records",
        },
        records: {
          type: "array",
          description: "Array of records to update with their IDs",
          items: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "ID of the record to update",
              },
              record: {
                type: "object",
                description: "The updated record data",
              },
            },
            required: ["id", "record"],
          },
        },
      },
      required: ["collectionName", "records"],
    },
  },
  {
    name: "BulkDeleteRecords",
    description: "Delete multiple records from a collection at once",
    inputSchema: {
      type: "object",
      properties: {
        collectionName: {
          type: "string",
          description: "Name of the collection containing the records",
        },
        recordIds: {
          type: "array",
          description: "Array of record IDs to delete",
          items: {
            type: "string",
          },
        },
      },
      required: ["collectionName", "recordIds"],
    },
  },
  {
    name: "OpenBrowser",
    description: "Open a web browser to a specific URL",
    inputSchema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "The URL to open in the browser",
        },
      },
      required: ["url"],
    },
  },
  {
    name: "EstimateDocumentCount",
    description: "Estimate the number of documents in a collection using a fast, approximate count method",
    inputSchema: {
      type: "object",
      properties: {
        collectionName: {
          type: "string",
          description: "Name of the collection to estimate document count for",
        },
      },
      required: ["collectionName"],
    },
  },
  {
    name: "HelpAddToClient",
    description: "Help the user add the Astra DB client to their MCP client",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
] as const satisfies {
  name: ToolName;
  description: string;
  inputSchema: Schema;
}[];
