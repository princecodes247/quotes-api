import { InferSchemaInput, InferSchemaOutput } from "monarch-orm";
import { db, QuoteSchema } from "./database";
import { PaginationData } from "./validators";

export type Quote = InferSchemaOutput<typeof QuoteSchema>;
export type InsertQuote = InferSchemaInput<typeof QuoteSchema>;

export class QuotesRepository {
  public async getAll(pagination?: PaginationData): Promise<Quote[]> {
    if (!pagination) {
      const quotes = await db.collections.quotes
        .find()
        .options({ sort: { _id: -1 } })
        .exec();
      return quotes as Quote[]; // TODO: remove type cast
    }

    if (!pagination.page) pagination.page = 1;
    if (!pagination.limit) pagination.limit = 10;
    const skip = (pagination.page - 1) * pagination.limit;
    const quotes = await db.collections.quotes
      .find()
      .skip(skip)
      .limit(pagination.limit)
      .options({ sort: { _id: -1 } })
      .exec();
    return quotes as Quote[]; // TODO: remove type cast
  }

  public async create(data: InsertQuote): Promise<Quote> {
    const quote = await db.collections.quotes.insert().values(data).exec();
    return quote as Quote; // TODO: remove type cast
  }
}
