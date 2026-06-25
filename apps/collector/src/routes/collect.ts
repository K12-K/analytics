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

    const session = await findOrCreateSession(
      visitor.id,
      body.sessionToken,
      request.headers["user-agent"]
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