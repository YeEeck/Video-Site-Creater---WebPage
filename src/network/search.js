import { request } from "./instance";

export function search(data) {
  return request({
    url: "/search",
    method: "post",
    data: data,
  });
}
