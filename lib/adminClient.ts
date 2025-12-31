export function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("admin_token") || "";
}


export function setToken(token: string) {
  localStorage.setItem("admin_token", token);
}


export function clearToken() {
  localStorage.removeItem("admin_token");
}


export async function apiFetch<T>(
  path: string,
  opts: RequestInit & { auth?: boolean } = {}
): Promise<T> {
  const headers = new Headers(opts.headers || {});
  headers.set("Content-Type", "application/json");


  if (opts.auth) {
    const token = getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }


  const res = await fetch(path, { ...opts, headers, cache: "no-store" });
  const data = await res.json().catch(() => ({}));


  if (!res.ok) {
    const msg = (data && (data.error || data.message)) || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data as T;
}
