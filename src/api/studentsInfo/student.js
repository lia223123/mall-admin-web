import request from "../utils/request";

//查询所有
export function listStudent(query){
  return request({
    url: '/studentsinfo/v1/studentList/',
    method: 'get',
    params: query
  })
}
//查询详细
export function getStudent(id){
  return request({
    url: '/studentsinfo/v1/studentList/' + id + '/',
    method: 'get'
  })
}
//增加
export function addStudent(data){
  return request({
    url: '/studentsinfo/v1/studentList/',
    method: 'post',
    data: data
  })
}
//修改
export function editStudent(data){
  return request({
    url: '/studentsinfo/v1/studentList/' + data.id + '/',
    method: 'put',
    data: data
  })
}
//删除
export function deleteStudent(id){
  return request({
    url: '/studentsinfo/v1/studentList/' + id + '/',
    method: 'delete'
  })
}
