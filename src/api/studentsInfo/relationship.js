import request from "../../utils/request";

//查询所有
export function listRelationship(query){
  return request({
    url: '/studentsinfo/v1/Relationship/',
    method: 'get',
    params: query
  })
}
//查询详细
export function getRelationship(id){
  return request({
    url: '/studentsinfo/v1/Relationship/' + id + '/',
    method: 'get'
  })
}
//增加
export function addRelationship(data){
  return request({
    url: '/studentsinfo/v1/Relationship/',
    method: 'post',
    data: data
  })
}
//修改
export function editRelationship(data){
  return request({
    url: '/studentsinfo/v1/Relationship/' + data.id + '/',
    method: 'put',
    data: data
  })
}
//删除
export function deleteRelationship(id){
  return request({
    url: '/studentsinfo/v1/Relationship/' + id + '/',
    method: 'delete'
  })
}
