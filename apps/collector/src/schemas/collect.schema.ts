import { z } from "zod";

export const collectSchema = z.object({
  siteId: z.string().uuid(),
  visitorToken: z.string(),
  sessionToken: z.string(),
  eventType: z.string(),
  path: z.string().optional(),
  referrer: z.string().optional(),
  payload: z.record(z.any(), z.unknown()).optional(),
});

export type CollectBody = z.infer<typeof collectSchema>;