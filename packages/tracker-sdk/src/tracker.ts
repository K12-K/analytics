import { getCookie, setCookie } from "./cookies";
import { getOrCreateSession } from "./session";
import { generateId } from "./utils";

type TrackerConfig = {
  siteId: string;
  endpoint: string;
};

class Tracker {
  private siteId = "";
  private endpoint = "";

  init(config: TrackerConfig) {
    this.siteId = config.siteId;
    this.endpoint = config.endpoint;

    let visitorToken = getCookie("vid");
    // let sessionToken = getCookie("sid");
    getOrCreateSession();

    if (!visitorToken) {
      visitorToken = generateId();
      setCookie("vid", visitorToken);
    }

    // if (!sessionToken) {
    //   sessionToken = generateId();
    //   setCookie("sid", sessionToken);
    // }

    this.track("pageview", {
      path: window.location.pathname,
      referrer: document.referrer,
      payload: {
        title: document.title,
      },
    });
  }

  async track(
    eventType: string,
    data?: {
      path?: string;
      referrer?: string;
      payload?: Record<string, unknown>;
    }
  ) {
    const visitorToken = getCookie("vid");
    const sessionToken = getCookie("sid");

    setCookie("slast", String(Date.now()));

    await fetch(`${this.endpoint}/collect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        siteId: this.siteId,
        visitorToken,
        sessionToken,
        eventType,
        path: data?.path,
        referrer: data?.referrer,
        payload: data?.payload,
      }),
    });
  }
}

export const tracker = new Tracker();