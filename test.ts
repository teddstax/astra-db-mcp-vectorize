import { CreateCollection } from "./tools/CreateCollection.js";

await CreateCollection({
    collectionName: "trx8",
    modelName: "text-embedding-3-small",
    dimensions: 1536,
    apiKeyName: "test",
    provider: "openai",
  });