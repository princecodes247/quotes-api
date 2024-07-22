import { createClient, createDatabase } from "monarch-orm";
import { QuoteSchema } from "./model";


const client = createClient("mongodb://localhost:27017/monarch-quotes")
const {collections} = createDatabase(client, {
    quotes: QuoteSchema
})

export {
    client,
    collections,
}