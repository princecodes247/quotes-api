import { createSchema, string, InferSchemaInput } from "monarch-orm";


export const QuoteSchema = createSchema("quotes", {
    message: string(),
    author: string()
})

export type IQuote = InferSchemaInput<typeof QuoteSchema>