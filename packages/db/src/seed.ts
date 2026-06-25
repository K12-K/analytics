// THIS IS ALSO BASICALLY A test, used to add first entry as done in test.ts for connection testing
import "./env";
import { db, sites } from "./index";
import { randomUUID } from "crypto";

async function main() {
  const site = await db
    .insert(sites)
    .values({
      id: randomUUID(),
      name: "Portfolio",
      domain: "localhost",
      apiKey: "dev-secret-key",
    })
    .returning();

  console.log(site[0]);
}

main();
// TO RUN, pnpm --filter @analytics/db exec tsx src/seed.ts