import request from "../utils/request";

//查询所有
export function listTenderProject(query){
  return request({
    url: '/tenderproject/v1/tenderProject/',
    method: 'get',
    params: query
  })
}
//查询详细
export function getTenderProject(id){
  return request({
    url: '/tenderproject/v1/tenderProject/' + id + '/',
    method: 'get'
  })
}
//增加
export function addTenderProject(data){
  return request({
    url: '/tenderproject/v1/tenderProject/',
    method: 'post',
    data: data
  })
}
//修改
export function editTenderProject(data){
  return request({
    url: '/tenderproject/v1/tenderProject/' + data.id + '/',
    method: 'put',
    data: data
  })
}
//删除
export function deleteTenderProject(id){
  return request({
    url: '/tenderproject/v1/tenderProject/' + id + '/',
    method: 'delete'
  })
}
