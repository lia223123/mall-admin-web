import request from "../../utils/request";

//查询所有
export function listBanJi(query){
  return request({
    url: '/studentsinfo/v1/banJiList/',
    method: 'get',
    params: query
  })
}
//查询详细
export function getBanJi(id){
  return request({
    url: '/studentsinfo/v1/banJiList/' + id + '/',
    method: 'get'
  })
}
//增加
export function addBanJi(data){
  return request({
    url: '/studentsinfo/v1/banJiList/',
    method: 'post',
    data: data
  })
}
//修改
export function editBanJi(data){
  return request({
    url: '/studentsinfo/v1/banJiList/' + data.id + '/',
    method: 'put',
    data: data
  })
}
//删除
export function deleteBanJi(id){
  return request({
    url: '/studentsinfo/v1/banJiList/' + id + '/',
    method: 'delete'
  })
}
//查询班级下学员信息
export function BStuCount(id){
  return request({
    url: '/studentsinfo/v1/BStuCount/' + id +'/',
    method: 'get'
  })
}
