import { CreateCollection } from "./tools/CreateCollection.ts";

await CreateCollection({
    collectionName: "trx5",
    modelName: "text-embedding-ada-003",
    dimensions: 1536,
    apiKeyName: "test",
    provider: "openai",
  });