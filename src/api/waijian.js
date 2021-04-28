import request from "../utils/request";

export function listStuAndBanAndAD(param){
  return request({
    url: 'studentsinfo/v1/Stu_Ban_AdList/',
    method: 'get',
    params: param
  })
}

export function addStuAndBanAndAD(data){
  return request({
    url: 'studentsinfo/v1/Stu_Ban_AdList/',
    method: 'post',
    data: data
  })
}

export function editStuAndBanAndAD(data){
  return request({
    url: 'studentsinfo/v1/Stu_Ban_AdList/',
    method: 'put',
    data: data
  })
}
