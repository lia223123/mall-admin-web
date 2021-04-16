import request from "../../utils/request";
//查询
export function listFinanceInfo(query){
  return request({
    url: '/finance/v1/financeInfo/',
    method: 'get',
    params: query
  })
}
//获取详细信息
export function getFinanceInfo(id) {
  return request({
    url: '/finance/v1/financeInfo/' + id + '/',
    method: 'get'
  })
}
//增加
export function addFinanceInfo(data) {
  return request({
    url: '/finance/v1/financeInfo/',
    method: 'post',
    data: data
  })
}
//修改
export function editFinanceInfo(data) {
  return request({
    url: '/finance/v1/financeInfo/' + data.id + '/',
    method: 'put',
    data: data
  })
}
//删除
export function deleteFinanceInfo(id) {
  return request({
    url: '/finance/v1/financeInfo/' + id + '/',
    method: 'delete'
  })
}
