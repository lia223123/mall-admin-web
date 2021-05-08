import request from "../../utils/request";

export function listSettleAccounts(query){
  return request({
    url: '/finance/v1/SettleAccounts/',
    method: 'get',
    params: query
  })
}
export function getSettleAccounts(id){
  return request({
    url: '/finance/v1/SettleAccounts/' + id +'/',
    method: 'get'
  })
}
export function addSettleAccounts(data){
  return request({
    url: '/finance/v1/SettleAccounts/',
    method: 'post',
    data: data
  })
}
export function editSettleAccounts(data){
  return request({
    url: '/finance/v1/SettleAccounts/' + data.id + '/',
    method: 'put',
    data: data
  })
}
export function deleteSettleAccounts(id){
  return request({
    url: '/finance/v1/SettleAccounts/' + id + '/',
    method: 'delete'
  })
}
