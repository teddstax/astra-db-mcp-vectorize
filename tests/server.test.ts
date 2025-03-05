import { describe, it, expect, vi, beforeEach } from "vitest";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { tools } from "../tools.js";

// Mock the tools
vi.mock("../tools/GetCollections.js", () => ({
  GetCollections: vi.fn().mockResolvedValue([
    { name: "test_collection1", type: "vector" },
    { name: "test_collection2", type: "document" },
  ]),
}));

vi.mock("../tools/CreateCollection.js", () => ({
  CreateCollection: vi.fn().mockImplementation((args) => {
    return Promise.resolve({
      name: args.collectionName,
      vector: args.vector !== undefined ? args.vector : true,
      dimension: args.dimension || 1536,
    });
  }),
}));

// Mock the Server class
vi.mock("@modelcontextprotocol/sdk/server/index.js", () => {
  return {
    Server: vi.fn().mockImplementation(() => ({
      setRequestHandler: vi.fn(),
    })),
  };
});

describe("MCP Server", () => {
  beforeEach(() => {
    // Clear all mocks
    vi.clearAllMocks();

    // Import the server module to trigger the initialization
    // This will execute the code in index.js which sets up the server
    require("../index.js");
  });

  it("should initialize the server with correct configuration", () => {
    // Check that the Server constructor was called with the correct arguments
    expect(Server).toHaveBeenCalledWith(
      {
        name: "astra-db-mcp-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {
            list: true,
            call: true,
          },
        },
      }
    );
  });

  it("should set up request handlers for ListTools and CallTool", () => {
    // Check that the request handlers were set up
    expect(mockSetRequestHandler).toHaveBeenCalledTimes(2);

    // Check that the ListTools handler was set up
    expect(mockSetRequestHandler).toHaveBeenCalledWith(
      ListToolsRequestSchema,
      expect.any(Function)
    );

    // Check that the CallTool handler was set up
    expect(mockSetRequestHandler).toHaveBeenCalledWith(
      CallToolRequestSchema,
      expect.any(Function)
    );
  });
});
