import request from "../../utils/request";
//查询
export function listCostDetailing(query){
  return request({
    url: '/finance/v1/CostDetailing/',
    method: 'get',
    params: query
  })
}
//获取详细信息
export function getCostDetailing(id) {
  return request({
    url: '/finance/v1/CostDetailing/' + id + '/',
    method: 'get'
  })
}
//增加
export function addCostDetailing(data) {
  return request({
    url: '/finance/v1/CostDetailing/',
    method: 'post',
    data: data
  })
}
//修改
export function editCostDetailing(data) {
  return request({
    url: '/finance/v1/CostDetailing/' + data.id + '/',
    method: 'put',
    data: data
  })
}
//删除
export function deleteCostDetailing(id) {
  return request({
    url: '/finance/v1/CostDetailing/' + id + '/',
    method: 'delete'
  })
}
