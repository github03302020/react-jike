import { request } from "@/utils";

export function getChannelsAPI(){
  return request({
    method: "GET",
    url: "/channels"
  })
}

export function createArticleAPI(data){
  return request({
    method: "POST",
    url: "/articles",
    data
  })
}