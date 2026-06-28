// prisma.config.ts — Prisma v7 configuration file (must be at project root)
// DATABASE_URL is configured here; it is REMOVED from schema.prisma in v7.
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // env() loads the value and validates it is set at runtime
    url: env("DATABASE_URL"),
  },
});
