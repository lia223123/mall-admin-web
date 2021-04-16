import request from "@/utils/request";

//查询所有
export function listAdTeacher(query){
  return request({
    url: '/studentsinfo/v1/adTeacherList/',
    method: 'get',
    params: query
  })
}
//查询详细
export function getAdTeacher(id){
  return request({
    url: '/studentsinfo/v1/adTeacherList/' + id + '/',
    method: 'get'
  })
}
//增加
export function addAdTeacher(data){
  return request({
    url: '/studentsinfo/v1/adTeacherList/',
    method: 'post',
    data: data
  })
}
//修改
export function editAdTeacher(data){
  return request({
    url: '/studentsinfo/v1/adTeacherList/' + data.id + '/',
    method: 'put',
    data: data
  })
}
//删除
export function deleteAdTeacher(id){
  return request({
    url: '/studentsinfo/v1/adTeacherList/' + id + '/',
    method: 'delete'
  })
}
