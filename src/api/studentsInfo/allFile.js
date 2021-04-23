import request from "../../utils/request";

export function getAllFile(){
  return request({
    url: 'filemanage/v1/allFile/',
    method: 'get'
  })
}
