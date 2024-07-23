if (typeof process.env.PORT !== "string") {
  throw new Error("PORT environment variable is required");
}
if (typeof process.env.MONGO_URI !== "string") {
  throw new Error("MONGO_URI environment variable is required");
}

export const config = {
  PORT: Number(process.env.PORT),
  MONGO_URI: process.env.MONGO_URI,
} as const;
