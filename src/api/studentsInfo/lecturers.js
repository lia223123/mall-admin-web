import request from "../../utils/request";

//查询所有
export function listLecturers(query){
  return request({
    url: '/studentsinfo/v1/leTeacherList/',
    method: 'get',
    params: query
  })
}
//查询详细
export function getLecturers(id){
  return request({
    url: '/studentsinfo/v1/leTeacherList/' + id + '/',
    method: 'get'
  })
}
//增加
export function addLecturers(data){
  return request({
    url: '/studentsinfo/v1/leTeacherList/',
    method: 'post',
    data: data
  })
}
//修改
export function editLecturers(data){
  return request({
    url: '/studentsinfo/v1/leTeacherList/' + data.id + '/',
    method: 'put',
    data: data
  })
}
//删除
export function deleteLecturers(id){
  return request({
    url: '/studentsinfo/v1/leTeacherList/' + id + '/',
    method: 'delete'
  })
}
