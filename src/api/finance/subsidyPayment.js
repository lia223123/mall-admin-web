import request from "../../utils/request";

export function listSubsidyPayment(query){
  return request({
    url: '/finance/v1/SubsidyPayment/',
    method: 'get',
    params: query
  })
}
export function getSubsidyPayment(id){
  return request({
    url: '/finance/v1/SubsidyPayment/' + id +'/',
    method: 'get'
  })
}
export function addSubsidyPayment(data){
  return request({
    url: '/finance/v1/SubsidyPayment/',
    method: 'post',
    data: data
  })
}
export function editSubsidyPayment(data){
  return request({
    url: '/finance/v1/SubsidyPayment/' + data.id + '/',
    method: 'put',
    data: data
  })
}
export function deleteSubsidyPayment(id){
  return request({
    url: '/finance/v1/SubsidyPayment/' + id + '/',
    method: 'delete'
  })
}
