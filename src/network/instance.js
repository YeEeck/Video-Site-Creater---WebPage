import axios from "axios";

export function request(config) {
  const url = "http://" + window.location.hostname + ":8880/";
  const instant = axios.create({
    baseURL: url,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 8000,
  });

  return instant(config);
}
