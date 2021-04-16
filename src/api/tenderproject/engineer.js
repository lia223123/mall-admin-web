import request from "../utils/request";

//查询所有
export function listEngineer(query){
  return request({
    url: '/tenderproject/v1/engineer/',
    method: 'get',
    params: query
  })
}
//查询详细
export function getEngineer(id){
  return request({
    url: '/tenderproject/v1/engineer/' + id + '/',
    method: 'get'
  })
}
//增加
export function addEngineer(data){
  return request({
    url: '/tenderproject/v1/engineer/',
    method: 'post',
    data: data
  })
}
//修改
export function editEngineer(data){
  return request({
    url: '/tenderproject/v1/engineer/' + data.id + '/',
    method: 'put',
    data: data
  })
}
//删除
export function deleteEngineer(id){
  return request({
    url: '/tenderproject/v1/engineer/' + id + '/',
    method: 'delete'
  })
}
