const API_URL = import.meta.env.VITE_API_URL;

export async function getStats() {
  return fetch(`${API_URL}/stats`).then((res) => res.json());
}

export async function getEvents() {
  return fetch(`${API_URL}/events`).then((res) => res.json());
}

export async function getPages() {
  return fetch(`${API_URL}/pages`).then((res) => res.json());
}

export async function getCountries() {
  return fetch(`${API_URL}/countries`).then((res) => res.json());
}