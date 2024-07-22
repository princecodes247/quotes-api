import { z } from "zod";

export const createQuote = z.object({
  author: z.string(),
  message: z.string(),
});
export type CreateQuoteData = z.infer<typeof createQuote>;

export const pagination = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
});
export type PaginationData = z.infer<typeof pagination>;
