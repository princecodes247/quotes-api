import {
  createClient,
  createDatabase,
  createSchema,
  string,
} from "monarch-orm";

export const QuoteSchema = createSchema("quotes", {
  message: string(),
  author: string(),
});

export const client = createClient("mongodb://localhost:27017/monarch-quotes");
export const db = createDatabase(client, {
  quotes: QuoteSchema,
});
