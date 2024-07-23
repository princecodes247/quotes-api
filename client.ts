import { getRandom } from "@anilseervi/inspirational-quotes";
import { hc } from "hono/client";
import type { App } from "./src";
import { config } from "./src/config";

const client = hc<App>(`http://localhost:${config.PORT}`);

async function main() {
  console.log("Creating new random quote...");
  const generator = getRandom();
  const newQuote = await client.quotes
    .$post({
      json: {
        author: `CLI: ${generator.author}`,
        message: generator.quote,
      },
    })
    .then((res) => res.json());
  console.log("Created quote:", newQuote, "\n");

  const allQuotes = await client.quotes.all.$get().then((res) => res.json());
  console.log(allQuotes);
}
main();
