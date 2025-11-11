import { request } from "@/utils";

export function getChannelsAPI(){
  return request({
    method: "GET",
    url: "/channels"
  })
}