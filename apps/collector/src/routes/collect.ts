import { FastifyInstance } from "fastify";
import { collectSchema } from "../schemas/collect.schema";
import { getSite } from "../services/site.service";
import { findOrCreateVisitor } from "../services/visitor.service";
import { findOrCreateSession } from "../services/session.service";
import { createEvent } from "../services/event.service";

export async function collectRoute(app: FastifyInstance) {
  app.post("/collect", async (request, reply) => {
    const body = collectSchema.parse(request.body);

    const site = await getSite(body.siteId);

    if (!site) {
      return reply.status(404).send({
        message: "Site not found",
      });
    }

    const visitor = await findOrCreateVisitor(
      body.siteId,
      body.visitorToken
    );

    // REMOVE THEN, clientIp, FOR TESTING, SINCE LOCALHOST CAN"T PROVICE IP ADD, FASTILY WILL PROVIDE IP ON SERVER
    // const clientIp = request.ip === "127.0.0.1" || request.ip === "::1" ? "8.8.8.8" : request.ip;
    const clientIp = request.headers["x-forwarded-for"]?.toString().split(",")[0] || request.ip;
    console.log({
      ip,
      forwarded: request.headers["x-forwarded-for"]
    });

    const session = await findOrCreateSession(
      visitor.id,
      body.sessionToken,
      request.headers["user-agent"],
      // request.ip
      clientIp
    );

    const event = await createEvent({
      siteId: body.siteId,
      visitorId: visitor.id,
      sessionId: session.id,
      eventType: body.eventType,
      path: body.path,
      referrer: body.referrer,
      payload: body.payload,
    });

    return reply.send({
      success: true,
      eventId: event.id,
    });
  });
}