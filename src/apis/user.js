import { request } from "@/utils";

export function loginAPI(formData){
  return request({
    method: "POST",
    url: "/authorizations",
    data: formData
  })
}

export function getProfileAPI(){
  return request({
    method: "GET",
    url: "/profile",
  })
}