import { request } from "./instance";

export function getCommentFromVideo(data) {
  return request({
    url: "/getCommentFromVideo",
    method: "post",
    data: data,
  });
}

export function addComment(data) {
  return request({
    url: "/addComment",
    method: "post",
    data: data,
  });
}

export function delComment(data) {
  return request({
    url: "/delComment",
    method: "post",
    data: data,
  });
}
