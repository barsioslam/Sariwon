const API_BASE = import.meta.env.VITE_API_BASE;

if (!API_BASE) {
  throw new Error("VITE_API_BASE is not defined");
}

async function request(method, path, body) {
  const headers = {};

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  const options = {
    method,
    credentials: "include",
    headers,
  };

  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${path}`, options);

  let json = {};

  try {
    json = await res.json();
  } catch {
    // réponse non JSON
  }

  if (!res.ok || json.success === false) {
    const err = new Error(
      json?.data?.message || json?.message || `HTTP ${res.status}`,
    );

    err.code = json?.data?.code;
    err.status = res.status;

    throw err;
  }

  console.log("API response:", json);
  return json.data;
}

export const api = {
  get: (path) => request("GET", path),
  post: (path, body) => request("POST", path, body),
  put: (path, body) => request("PUT", path, body),
  delete: (path, body) => request("DELETE", path, body),
};
