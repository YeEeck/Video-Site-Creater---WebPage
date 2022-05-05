import { request } from "./instance";

export function getStarList(data) {
  return request({
    url: "/getStarList",
    method: "post",
    data: data,
  });
}

export function getStarVideo(data) {
  return request({
    url: "/getStarVideo",
    method: "post",
    data: data,
  });
}

export function getStarListLength(data) {
  return request({
    url: "/getStarListLength",
    method: "post",
    data: data,
  });
}

export function getStar(data) {
  return request({
    url: "/getStar",
    method: "post",
    data: data,
  });
}

export function getStarVideoLength(data) {
  return request({
    url: "/getStarVideoLength",
    method: "post",
    data: data,
  });
}

export function addUserStarVideo(data) {
  return request({
    url: "/addUserStarVideo",
    method: "post",
    data: data,
  });
}

export function delUserStarVideo(data) {
  return request({
    url: "/delUserStarVideo",
    method: "post",
    data: data,
  });
}

export function checkUserStar(data) {
  return request({
    url: "/checkUserStar",
    method: "post",
    data: data,
  });
}

export function getUserStar(data) {
  return request({
    url: "/getUserStar",
    method: "post",
    data: data,
  });
}
