import request from "../../utils/request";

export function listSeCount(query){
  return request({
    url: '/finance/v1/SeCount/',
    method: 'get',
    params: query
  })
}
export function getSeCount(id){
  return request({
    url: '/finance/v1/SeCount/' + id +'/',
    method: 'get'
  })
}
export function addSeCount(data){
  return request({
    url: '/finance/v1/SeCount/',
    method: 'post',
    data: data
  })
}
export function editSeCount(data){
  return request({
    url: '/finance/v1/SeCount/' + data.id + '/',
    method: 'put',
    data: data
  })
}
export function deleteSeCount(id){
  return request({
    url: '/finance/v1/SeCount/' + id + '/',
    method: 'delete'
  })
}
