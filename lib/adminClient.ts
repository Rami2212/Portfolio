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

// Only allow FormData or string for fetch body
type ApiFetchOptions = Omit<RequestInit, "body"> & {
  auth?: boolean;
  body?: FormData | Record<string, any>;
};

export async function apiFetch<T>(
  path: string,
  opts: ApiFetchOptions = {}
): Promise<T> {
  const headers = new Headers(opts.headers || {});
  const isFormData = opts.body instanceof FormData;

  if (!isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (opts.auth) {
    const token = getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  // Convert body to a string or FormData
  let body: BodyInit | undefined = undefined;
  if (opts.body) {
    if (opts.body instanceof FormData) {
      body = opts.body;
    } else {
      body = JSON.stringify(opts.body); // now TS sees it as string | FormData
    }
  }

  const res = await fetch(path, {
    ...opts,
    headers,
    body,
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg =
      (data && (data.error || data.message)) ||
      `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return data as T;
}
