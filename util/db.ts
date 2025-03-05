import "dotenv/config";
import { DataAPIClient } from "@datastax/astra-db-ts";

if (!process.env.ASTRA_DB_APPLICATION_TOKEN) {
  throw new Error("ASTRA_DB_APPLICATION_TOKEN is not set");
}

if (!process.env.ASTRA_DB_API_ENDPOINT) {
  throw new Error("ASTRA_DB_API_ENDPOINT is not set");
}

const client = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN);
export const db = client.db(process.env.ASTRA_DB_API_ENDPOINT);
