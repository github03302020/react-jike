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

export function getArticleListAPI(params){
  return request({
    method: "GET",
    url: "/articles",
    params
  })
}

export function deleteArticleAPI(id){
  return request({
    method: "DELETE",
    url: `/articles/${id}`
  })
}

export function getArticleByIdAPI(id){
  return request({
    method: "GET",
    url: `/articles/${id}`
  })
}

export function updateArticleAPI(data){
  return request({
    method: "PUT",
    url: `/articles/${data.id}`,
    data
  })
}