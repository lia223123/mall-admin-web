import request from "../../utils/request";
export function getBanFile(query){
  return request({
    url: '/studentsinfo/v1/banFile/',
    method: 'get',
    params: query
  })
}
