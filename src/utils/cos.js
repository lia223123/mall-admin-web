import COS from "cos-js-sdk-v5";
import {Message} from 'element-ui';
import {v4 as uuidv4} from 'uuid'

export function LEupload(Secret,file,key){
  const flieArr = file.name.split('.');
  let suffix = flieArr[flieArr.length - 1];
  let fileName = key + uuidv4().split("-",1) + Date.now() + "." + suffix;
  const cos =  new COS({
    // getAuthorization: function (options, callback){
    //   callback({
    //     TmpSecretId: Secret.credentials.tmpSecretId,        // 临时密钥的 tmpSecretId
    //     TmpSecretKey: Secret.credentials.tmpSecretKey,      // 临时密钥的 tmpSecretKey
    //     XCosSecurityToken: Secret.credentials.sessionToken, // 临时密钥的 sessionToken
    //     ExpiredTime: Secret.startTime
    //   })
  // }
    SecretKey: 'ngMsuVu996A0a3NVRBBg2ORIzGLDxdBH',
    SecretId: 'AKIDAGDUf8IjrZ7UuE4nX4UheN0cEQgqNQtV'
  });
  return new Promise((resolve, reject) =>{
    cos.putObject({
      Bucket: 'filegchumandatas01-1304877674',
      Region:  'ap-nanjing',
      Key:fileName,
      Body: file,
      onProgress: function(progressData) {
        console.log(JSON.stringify(progressData));
      },
  },function (err, data){
      if(err){
        reject(err)
      }
      else{
        resolve(fileName)
      }
    })
  })
}

//覆盖上传
export function reLoad(Secret,file,key){
  const cos =  new COS({
    getAuthorization: function (options, callback){
      callback({
        TmpSecretId: Secret.credentials.tmpSecretId,        // 临时密钥的 tmpSecretId
        TmpSecretKey: Secret.credentials.tmpSecretKey,      // 临时密钥的 tmpSecretKey
        XCosSecurityToken: Secret.credentials.sessionToken, // 临时密钥的 sessionToken
        ExpiredTime: Secret.startTime
      })
    }
    // SecretKey: 'ngMsuVu996A0a3NVRBBg2ORIzGLDxdBH',
    // SecretId: 'AKIDAGDUf8IjrZ7UuE4nX4UheN0cEQgqNQtV'
  });
  return new Promise((resolve, reject) =>{
    cos.putObject({
      Bucket: 'filegchumandatas01-1304877674',
      Region:  'ap-nanjing',
      Key: key,
      Body: file,
      onProgress: function(progressData) {
        console.log(JSON.stringify(progressData));
      },
    },function (err, data){
      if(err){
        reject(err)
      }
      else{
        resolve(data)
      }
    })
  })
}
//下载对象
export function DownLoadCos(Secret,key){
  const cos = new COS({
    getAuthorization: function (options, callback){
      callback({
        TmpSecretId: Secret.credentials.tmpSecretId,        // 临时密钥的 tmpSecretId
        TmpSecretKey: Secret.credentials.tmpSecretKey,      // 临时密钥的 tmpSecretKey
        XCosSecurityToken: Secret.credentials.sessionToken, // 临时密钥的 sessionToken
        ExpiredTime: Secret.startTime
      })
    }
    // SecretKey: 'ngMsuVu996A0a3NVRBBg2ORIzGLDxdBH',
    // SecretId: 'AKIDAGDUf8IjrZ7UuE4nX4UheN0cEQgqNQtV'
  });
  return new Promise((resolve, reject) => {
    cos.getObjectUrl({
      Bucket: 'filegchumandatas01-1304877674',
      Region:  'ap-nanjing',
      Key: key,
    },function(err, data) {
      if(err){
        reject(err)
      }else{
        resolve(data.Url)
      }
    });
  })
}
//下载对象
export function download(Secret,key){
  const cos = new COS({
    getAuthorization: function (options, callback){
      callback({
        TmpSecretId: Secret.credentials.tmpSecretId,        // 临时密钥的 tmpSecretId
        TmpSecretKey: Secret.credentials.tmpSecretKey,      // 临时密钥的 tmpSecretKey
        XCosSecurityToken: Secret.credentials.sessionToken, // 临时密钥的 sessionToken
        ExpiredTime: Secret.startTime
      })
    }
    // SecretKey: 'ngMsuVu996A0a3NVRBBg2ORIzGLDxdBH',
    // SecretId: 'AKIDAGDUf8IjrZ7UuE4nX4UheN0cEQgqNQtV'
  });
  return new Promise((resolve, reject) => {
    cos.getObject({
      Bucket: 'filegchumandatas01-1304877674',
      Region:  'ap-nanjing',
      Key: key,
    },function(err, data) {
      if(err){
        reject(err)
      }else{
        resolve(data)
      }
    });
  })
}
//删除
export function DeleteCos(Secret, key){
  const cos = new COS({
    getAuthorization: function (options, callback){
      callback({
        TmpSecretId: Secret.credentials.tmpSecretId,        // 临时密钥的 tmpSecretId
        TmpSecretKey: Secret.credentials.tmpSecretKey,      // 临时密钥的 tmpSecretKey
        XCosSecurityToken: Secret.credentials.sessionToken, // 临时密钥的 sessionToken
        ExpiredTime: Secret.startTime
      })
    }
    // SecretKey: 'ngMsuVu996A0a3NVRBBg2ORIzGLDxdBH',
    // SecretId: 'AKIDAGDUf8IjrZ7UuE4nX4UheN0cEQgqNQtV'
  });
  return new Promise((resolve, reject) => {
    cos.deleteObject({
      Bucket: 'filegchumandatas01-1304877674',
      Region:  'ap-nanjing',
      Key: key,
    },function(err, data) {
      if(err){
        reject(err)
      }else{
        resolve(data)
      }
    });
  })
}
//获取列表
export function getBucket(Secret, prefix){
  const cos = new COS({
    getAuthorization: function (options, callback){
      callback({
        TmpSecretId: Secret.credentials.tmpSecretId,        // 临时密钥的 tmpSecretId
        TmpSecretKey: Secret.credentials.tmpSecretKey,      // 临时密钥的 tmpSecretKey
        XCosSecurityToken: Secret.credentials.sessionToken, // 临时密钥的 sessionToken
        ExpiredTime: Secret.startTime
      })
    }
    // SecretKey: 'ngMsuVu996A0a3NVRBBg2ORIzGLDxdBH',
    // SecretId: 'AKIDAGDUf8IjrZ7UuE4nX4UheN0cEQgqNQtV'
  });
  return new Promise((resolve, reject) => {
    cos.getBucket({
      Bucket: 'filegchumandatas01-1304877674', /* 必须 */
      Region: 'ap-nanjing',     /* 必须 */
      Prefix: prefix,           /* 非必须 */
    }, function(err, data) {
      if(err){
        reject(err)
      }else{
        resolve(data)
      }
    });
  })
}
//查询对象元数据
export function getHead(Secret, key){
  const cos = new COS({
    getAuthorization: function (options, callback){
      callback({
        TmpSecretId: Secret.credentials.tmpSecretId,        // 临时密钥的 tmpSecretId
        TmpSecretKey: Secret.credentials.tmpSecretKey,      // 临时密钥的 tmpSecretKey
        XCosSecurityToken: Secret.credentials.sessionToken, // 临时密钥的 sessionToken
        ExpiredTime: Secret.startTime
      })
    }
    // SecretKey: 'ngMsuVu996A0a3NVRBBg2ORIzGLDxdBH',
    // SecretId: 'AKIDAGDUf8IjrZ7UuE4nX4UheN0cEQgqNQtV'
  });
  return new Promise((resolve , reject)=>{
    cos.headObject({
      Bucket: 'filegchumandatas01-1304877674', /* 必须 */
      Region: 'ap-nanjing',    /* 必须 */
      Key: key,               /* 必须 */
    }, function(err, data, body) {
      if(err){
        reject(err)
      }else{
        resolve(body)
      }
    });
  })
}
