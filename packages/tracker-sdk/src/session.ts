import { getCookie, setCookie } from "./cookies";
import { generateId } from "./utils";

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 min

export function getOrCreateSession() {
  const currentSession = getCookie("sid");
  const lastActivity = getCookie("slast");

  const now = Date.now();

  if (currentSession && lastActivity) {
    const diff = now - Number(lastActivity);

    if (diff < SESSION_TIMEOUT) {
      setCookie("slast", String(now));
      return currentSession;
    }
  }

  const newSession = generateId();

  setCookie("sid", newSession);
  setCookie("slast", String(now));

  return newSession;
}