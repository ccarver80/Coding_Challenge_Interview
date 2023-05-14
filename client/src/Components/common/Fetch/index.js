export async function CallAPI(url, method, body, auth) {
  if (window.sessionStorage.getItem("token")) {
    body.token = window.sessionStorage.getItem("token");
  }
  return await fetch(url, {
    method: method,
    headers: {
      "Content-type": "application/json",

      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
}

export async function GETAPI(url) {
  return await fetch(url).then((res) => res.json());
}

export const API_URL = process.env.REACT_APP_API_URL;
