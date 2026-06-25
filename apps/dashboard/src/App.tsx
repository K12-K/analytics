import { useEffect, useState } from "react";
import {
  getStats,
  getEvents,
  getPages,
  getCountries,
} from "./lib/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function App() {
  const [stats, setStats] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const [statsData, eventsData, pagesData, countriesData] =
        await Promise.all([
          getStats(),
          getEvents(),
          getPages(),
          getCountries(),
        ]);

      setStats(statsData);
      setEvents(eventsData);
      setPages(pagesData);
      setCountries(countriesData);
    }

    load();
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>Analytics Dashboard</h1>

      {stats && (
        <div>
          <h2>Overview</h2>
          <p>Visitors: {stats.visitors}</p>
          <p>Sessions: {stats.sessions}</p>
          <p>Events: {stats.events}</p>
        </div>
      )}

      <hr />

      <h2>Top Pages</h2>

      <BarChart width={600} height={300} data={pages}>
        <XAxis dataKey="path" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" />
      </BarChart>

      <table>
        <thead>
          <tr>
            <th>Path</th>
            <th>Views</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((page) => (
            <tr key={page.path}>
              <td>{page.path}</td>
              <td>{page.count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <h2>Countries</h2>

      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Sessions</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.country}>
              <td>{country.country}</td>
              <td>{country.count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

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