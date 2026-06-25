export type CollectPayload = {
  siteId: string
  visitorToken: string
  sessionToken: string
  eventType: string
  path?: string
  referrer?: string
  payload?: Record<string, unknown>
}