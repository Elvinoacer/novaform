import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const db = new PrismaClient({ adapter });

async function main() {
  const email = "admin@dajarch.studio";
  const password = "dajarch-admin-2025";
  
  const user = await db.adminUser.findUnique({ where: { email } });
  if (!user) {
    console.log("User not found!");
    return;
  }
  
  console.log("User found:", user.email);
  const ok = await bcrypt.compare(password, user.passwordHash);
  console.log("Password match:", ok);
}

main().finally(() => db.$disconnect());
