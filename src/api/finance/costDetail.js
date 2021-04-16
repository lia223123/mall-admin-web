import request from "../../utils/request";
//查询
export function listCostDetail(query){
  return request({
    url: '/finance/v1/costDetail/',
    method: 'get',
    params: query
  })
}
//获取详细信息
export function getCostDetail(id) {
  return request({
    url: '/finance/v1/costDetail/' + id + '/',
    method: 'get'
  })
}
//增加
export function addCostDetail(data) {
  return request({
    url: '/finance/v1/costDetail/',
    method: 'post',
    data: data
  })
}
//修改
export function editCostDetail(data) {
  return request({
    url: '/finance/v1/costDetail/' + data.id + '/',
    method: 'put',
    data: data
  })
}
//删除
export function deleteCostDetail(id) {
  return request({
    url: '/finance/v1/costDetail/' + id + '/',
    method: 'delete'
  })
}
