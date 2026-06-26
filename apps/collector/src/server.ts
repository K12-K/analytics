import "./env.config";
import { app } from "./app";

async function start() {
  try {
    await app.listen({
      port: 4000,
      host: "0.0.0.0",
    });

    console.log("Collector running on http://localhost:4000");
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();