import { useEffect, useState } from "react";

type Overview = {
  visitors: number;
  sessions: number;
  events: number;
};

type EventItem = {
  id: string;
  eventType: string;
  path: string | null;
  createdAt: string;
};

function App() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    async function load() {
      const stats = await fetch("http://localhost:4000/stats").then((r) =>
        r.json()
      );

      const recent = await fetch("http://localhost:4000/events").then((r) =>
        r.json()
      );

      setOverview(stats);
      setEvents(recent);
    }

    load();
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>Analytics Dashboard</h1>

      {overview && (
        <>
          <p>Visitors: {overview.visitors}</p>
          <p>Sessions: {overview.sessions}</p>
          <p>Events: {overview.events}</p>
        </>
      )}

      <h2>Recent Events</h2>

      {events.map((event) => (
        <div key={event.id}>
          <p>
            {event.eventType} — {event.path}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;