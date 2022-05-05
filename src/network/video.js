import { request } from "./instance";

export function getHotVideoList() {
  return request({
    url: "/getHotVideos",
    method: "get",
  });
}

export function getVideoInfo(data) {
  return request({
    url: "/getVideoInfo",
    method: "post",
    data: data,
  });
}

export function playVideo(data) {
  return request({
    url: "/playVideo",
    method: "post",
    data: data,
  });
}

export function getLike(data) {
  return request({
    url: "/getLike",
    method: "post",
    data: data,
  });
}

export function addLike(data) {
  return request({
    url: "/addLike",
    method: "post",
    data: data,
  });
}

export function delLike(data) {
  return request({
    url: "/delLike",
    method: "post",
    data: data,
  });
}
