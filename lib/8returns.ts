import 'server-only';

const BASE_URL = process.env.EIGHTRETURNS_API_URL ?? 'https://api.returnsportal.online';

function getAuthHeader(): string {
  const apiKey = process.env.EIGHTRETURNS_API_KEY;
  const password = process.env.EIGHTRETURNS_PASSWORD;
  if (!apiKey || !password) {
    throw new Error('Missing EIGHTRETURNS_API_KEY or EIGHTRETURNS_PASSWORD');
  }
  return `Bearer token="${password}", api_key="${apiKey}"`;
}

export async function eightReturnsFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: getAuthHeader(),
      Accept: 'application/json',
      ...(init?.headers || {})
    },
    cache: 'no-store'
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`8returns API ${res.status}: ${text || res.statusText}`);
  }
  return (await res.json()) as T;
}


