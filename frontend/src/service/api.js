export const BASE_URL = "http://localhost:5000/api" 

export const apiRequest = async (
  url,
  { method = "GET", body, headers = {}, ...options } = {}
) => {
  const response = await fetch(url, {
    ...options,
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(body !== undefined && {
      body: JSON.stringify(body),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
};