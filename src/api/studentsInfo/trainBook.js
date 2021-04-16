import request from "../utils/request";

//查询所有
export function listTrainBook(query){
  return request({
    url: '/studentsinfo/v1/trainBookList/',
    method: 'get',
    params: query
  })
}
//查询详细
export function getTrainBook(id){
  return request({
    url: '/studentsinfo/v1/trainBookList/' + id + '/',
    method: 'get'
  })
}
//增加
export function addTrainBook(data){
  return request({
    url: '/studentsinfo/v1/trainBookList/',
    method: 'post',
    data: data
  })
}
//修改
export function editTrainBook(data){
  return request({
    url: '/studentsinfo/v1/trainBookList/' + data.id + '/',
    method: 'put',
    data: data
  })
}
//删除
export function deleteTrainBook(id){
  return request({
    url: '/studentsinfo/v1/trainBookList/' + id + '/',
    method: 'delete'
  })
}
