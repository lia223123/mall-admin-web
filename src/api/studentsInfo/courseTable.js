import request from "../utils/request";

//查询所有
export function listCourseTable(query){
  return request({
    url: '/studentsinfo/v1/courseTableList/',
    method: 'get',
    params: query
  })
}
//查询详细
export function getCourseTable(id){
  return request({
    url: '/studentsinfo/v1/courseTableList/' + id + '/',
    method: 'get'
  })
}
//增加
export function addCourseTable(data){
  return request({
    url: '/studentsinfo/v1/courseTableList/',
    method: 'post',
    data: data
  })
}
//修改
export function editCourseTable(data){
  return request({
    url: '/studentsinfo/v1/courseTableList/' + data.id + '/',
    method: 'put',
    data: data
  })
}
//删除
export function deleteCourseTable(id){
  return request({
    url: '/studentsinfo/v1/courseTableList/' + id + '/',
    method: 'delete'
  })
}
