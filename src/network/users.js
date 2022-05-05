import { request } from "./instance";

export function getTitle() {
  return request({
    url: "/getSiteName",
    method: "get",
  });
}

export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data: data,
  });
}

export function reg(data) {
  return request({
    url: "/reg",
    method: "post",
    data: data,
  });
}

export function getUserInfo(data) {
  return request({
    url: "/getUserInfo",
    method: "post",
    data: data,
  });
}
