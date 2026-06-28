/**
 * Prisma v7 seed script — creates the initial admin user, marquee items,
 * and imports the static catalog from `lib/data.ts` into the DB.
 *
 * Run with: npm run db:seed
 */
import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { HOUSES } from "../src/lib/data";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const db = new PrismaClient({ adapter });

async function main() {
  // ---------- Admin ----------
  const existing = await db.adminUser.findUnique({
    where: { email: "admin@dajarch.studio" },
  });
  if (!existing) {
    const passwordHash = await bcrypt.hash("dajarch-admin-2025", 10);
    await db.adminUser.create({
      data: {
        email: "admin@dajarch.studio",
        name: "DAJ Arch Admin",
        passwordHash,
        role: "admin",
      },
    });
    console.log("✓ Seeded admin user  → admin@dajarch.studio / dajarch-admin-2025");
  } else {
    console.log("• Admin user already exists, skipping");
  }

  // ---------- Marquee ----------
  const marqueeItems = [
    { text: "Construction-ready plans", icon: "CheckCircle2", sortOrder: 0 },
    { text: "Architect-led designs", icon: "Compass", sortOrder: 1 },
    { text: "Site-adaptable", icon: "Ruler", sortOrder: 2 },
    { text: "Foundation to finish", icon: "Building2", sortOrder: 3 },
    { text: "100+ premium designs", icon: "Sparkles", sortOrder: 4 },
    { text: "Modern · Luxury · Villa", icon: "Gem", sortOrder: 5 },
  ];
  await db.marqueeItem.deleteMany({});
  for (const item of marqueeItems) {
    await db.marqueeItem.create({ data: { ...item, active: true } });
  }
  console.log(`✓ Seeded ${marqueeItems.length} marquee items`);

  // ---------- Designs (mirror of static catalog) ----------
  await db.designImage.deleteMany({});
  await db.design.deleteMany({});

  for (const h of HOUSES) {
    await db.design.create({
      data: {
        slug: h.slug,
        name: h.name,
        tagline: h.tagline,
        category: h.category,
        style: h.style,
        bedrooms: h.bedrooms,
        bathrooms: h.bathrooms,
        stories: h.stories,
        garage: h.garage,
        area: h.area,
        price: h.price,
        rating: h.rating,
        reviews: h.reviews,
        featured: h.featured,
        published: true,
        hero: h.hero,
        thumbnail: h.thumbnail,
        description: h.description,
        story: JSON.stringify(h.story),
        highlights: JSON.stringify(h.highlights),
        videoTour: JSON.stringify(h.videoTour),
        specifications: JSON.stringify(h.specifications),
        floorPlans: JSON.stringify(h.floorPlans),
        exterior: JSON.stringify(h.exterior),
        interiors: JSON.stringify(h.interiors),
        images: {
          create: h.gallery.map((g, i) => ({
            url: g.src,
            caption: g.caption ?? null,
            type: g.type,
            span: g.span ?? null,
            sortOrder: i,
          })),
        },
      },
    });
  }
  console.log(`✓ Seeded ${HOUSES.length} designs`);
}

main()
  .then(() => {
    console.log("✅ Seed completed successfully");
    process.exit(0);
  })
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
