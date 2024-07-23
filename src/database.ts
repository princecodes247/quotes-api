import {
  createClient,
  createDatabase,
  createSchema,
  string,
} from "monarch-orm";
import { config } from "./config";

export const QuoteSchema = createSchema("quotes", {
  message: string(),
  author: string(),
});

export const client = createClient(config.MONGO_URI);
export const db = createDatabase(client, {
  quotes: QuoteSchema,
});
