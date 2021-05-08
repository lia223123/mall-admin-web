import request from "../../utils/request";

export function listPayDetails(query){
  return request({
    url: '/finance/v1/PayDetails/',
    method: 'get',
    params: query
  })
}
export function getPayDetails(id){
  return request({
    url: '/finance/v1/PayDetails/' + id +'/',
    method: 'get'
  })
}
export function addPayDetails(data){
  return request({
    url: '/finance/v1/PayDetails/',
    method: 'post',
    data: data
  })
}
export function editPayDetails(data){
  return request({
    url: '/finance/v1/PayDetails/' + data.id + '/',
    method: 'put',
    data: data
  })
}
export function deletePayDetails(id){
  return request({
    url: '/finance/v1/PayDetails/' + id + '/',
    method: 'delete'
  })
}
