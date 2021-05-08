import request from "../../utils/request";

export function listEmDetails(query){
  return request({
    url: '/finance/v1/EmDetails/',
    method: 'get',
    params: query
  })
}
export function getEmDetails(id){
  return request({
    url: '/finance/v1/EmDetails/' + id +'/',
    method: 'get'
  })
}
export function addEmDetails(data){
  return request({
    url: '/finance/v1/EmDetails/',
    method: 'post',
    data: data
  })
}
export function editEmDetails(data){
  return request({
    url: '/finance/v1/EmDetails/' + data.id + '/',
    method: 'put',
    data: data
  })
}
export function deleteEmDetails(id){
  return request({
    url: '/finance/v1/EmDetails/' + id + '/',
    method: 'delete'
  })
}
