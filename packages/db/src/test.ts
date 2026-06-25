// I have removed to test this file for db connection, first install/add dotenv package again and
// then run this file using pnpm tsx src/test.ts
// pnpm --filter @analytics/db add dotenv

// ALSO ADD THIS CODE IN client.ts AT THE TOP OF CODE
// import dotenv from "dotenv";
// import { fileURLToPath } from "url";
// import path from "path";
// export const __filename = fileURLToPath(import.meta.url);
// export const __dirname = path.dirname(__filename);
// dotenv.config({
//   path: path.resolve(__dirname, "../../../.env"),
// });
// OR JUST IMPORT '.env.ts' here
// import './env'

import { db, sites } from "./index";
async function main() {
  const result = await db.select().from(sites);
  console.log(result);
}

main();