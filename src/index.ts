import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import { logger } from "hono/logger";
import { createRoute } from "serverstruct";
import { config } from "./config";
import { client } from "./database";
import { QuotesRepository } from "./repository";
import { createQuote, pagination } from "./validators";

const quotesRoutes = createRoute()
  .use<{ quotesRepo: QuotesRepository }>()
  .route((app, { quotesRepo }) => {
    return app
      .get("/all", async (ctx) => {
        const quotes = await quotesRepo.getAll();
        return ctx.json(quotes);
      })
      .get("/", zValidator("query", pagination), async (ctx) => {
        const query = ctx.req.valid("query");
        const quotes = await quotesRepo.getAll(query);
        return ctx.json(quotes);
      })
      .post("/", zValidator("json", createQuote), async (ctx) => {
        const body = ctx.req.valid("json");
        const quote = await quotesRepo.create(body);
        return ctx.json(quote, 201);
      });
  });

const app = createRoute()
  .provide({ quotesRepo: QuotesRepository })
  .subroutes({ quotes: quotesRoutes })
  .route((app, _, routes) => {
    return app
      .use(logger())
      .get("/", (ctx) => ctx.text("Active ⚡️"))
      .route("/quotes", routes.quotes);
  })
  .app();
export type App = typeof app;

client.connect().then(() => {
  console.log("MongoDB connected successfully");
  serve(
    {
      fetch: app.fetch,
      port: config.PORT,
    },
    (addr) => {
      console.log(`Server is running on http://localhost:${addr.port}`);
    }
  );
});
