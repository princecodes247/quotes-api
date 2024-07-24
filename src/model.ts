import { InferSchemaOutput, createSchema, string } from "monarch-orm"


export const QuoteSchema = createSchema("quotes", {
    message: string(),
    author: string()
})

export type IQuote = InferSchemaOutput<typeof QuoteSchema>