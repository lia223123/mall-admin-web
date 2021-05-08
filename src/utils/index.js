export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

//urlToFile
export function UrlToFile(dataurl,filename){
  let arr = dataurl.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  console.log(arr)
  console.log(mime)
  let bstr =atob(arr[1]);
  let n = bstr.length;
  let u8arr =new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  let blob = new Blob([u8arr], {type: mime });
  blob.lastModifiedDate = new Date();
  blob.name = filename;
  return new File([blob], filename,{type: contentType, lastModified: Date.now()})
}

//性别转换
export function formatSex(num){
  switch (num){
    case 1: return '男'
    case 2: return '女'
  }
}
export function FformatSex(num){
  switch (num){
    case '男': return 1
    case '女': return 2
  }
}
//员工类型
export function formatUserType(num) {
  switch (num) {
    case 1: return '普通员工'
    case 2: return '财务'
    case 3: return '管理员'
    case 4: return '超级管理员'
  }
}
//学生学历
export function stu_educations(num) {
  switch (num){
    case 1: return '无'
    case 2: return '小学'
    case 3: return '初中'
    case 4: return '高中'
    case 5: return '专科'
    case 6: return '本科'
    case 7: return '硕士'
    case 8: return '博士'
    default: return '无'
  }
}
export function Fstu_educations(num) {
  switch (num){
    case '无': return 1
    case '小学': return 2
    case '初中': return 3
    case '高中': return 4
    case '专科': return 5
    case '本科': return 6
    case '硕士': return 7
    case '博士': return 8
    default: return 1
  }
}
//人员类别
export function stu_personnel(num){
  switch (num){
    case 1: return "贫困家庭子女"
    case 2: return "贫困劳动力"
    case 3: return "失业人员"
    case 4: return "城乡未继续升学初高中毕业生"
    case 5: return "农村转移就业劳动力"
    case 6: return "转岗职工"
    case 7: return "残疾人"
    case 8: return "退役军人"
    default: return "无"
  }
}
export function Fstu_personnel(num){
  switch (num){
    case "贫困家庭子女": return 1
    case "贫困劳动力": return 2
    case "失业人员": return 3
    case "城乡未继续升学初高中毕业生": return 4
    case "农村转移就业劳动力": return 5
    case "转岗职工": return 6
    case "残疾人": return 7
    case "退役军人": return 8
    default: return 3
  }
}
//保险类型
export function InsureType(num){
  switch (num) {
    case 1: return "无"
    case 2: return "养老"
    case 3: return "失业人员"
    case 4: return "医疗"
    case 5: return "失业"
    case 6: return "工伤"
    default: return "无"
  }
}
export function FInsureType(num){
  switch (num) {
    case "无": return 1
    case "养老": return 2
    case "失业人员": return 3
    case "医疗": return 4
    case "失业": return 5
    case "工伤": return 6
    default: return 1
  }
}
//是否
export function isNot(num){
  switch (num) {
    case 1: return "是"
    case 2: return "否"
  }
}
export function FisNot(num){
  switch (num) {
    case "是": return 1
    case "否": return 2
  }
}
//班级性质
export function banjiType(num){
  switch (num) {
    case 1: return "政府补贴班"
    case 2: return "社招班"
  }
}
//证书等级
export function level(num){
  switch (num) {
    case '1': return "无（合格证）"
    case '2': return "专项能力证"
    case '3': return "初级"
    case '4': return "中级"
    case '5': return "高级"
    case '6': return "技师"
    case '7': return "高级技师"
    default: return "无"
  }
}
//招标单位
export function tenderCompany(num){
  switch(num) {
    case 1: return '人社局'
    case 2: return '公共就业和人才服务中心'
  }
}
//班级状态
export function ClassStatus(num){
  switch(num) {
    case 1: return '未进行'
    case 2: return '进行中'
    case 3: return '已结束'
  }
}
//数组比较
export function ArrayCompare(newArray,oldArray){
  if(newArray.length !== oldArray.length){
    return false
  }
  for(let i = 0;i < newArray.length; i++){
    if(newArray[i] !== oldArray[i]){
      return false
    }
  }
  return true
}
//财务信息模块
export function CWInfo(num){
  switch (num) {
    case 1 : return '耗材费'
    case 2 : return '教材费'
    case 3 : return '场地费'
    case 4 : return '会务费'
    case 5 : return '鉴定费'
    case 6 : return '接待费'
    case 7 : return '交通费'
    case 8 : return '汽车费'
    case 9 : return '食宿费'
    case 10 : return '生活补贴'
    case 11 : return '提成费用'
    case 12 : return '授课费用'
    case 13 : return '带班费用'
    case 14 : return '加班费用'
    case 15 : return '出差补贴'
    case 16 : return '预计收入'
  }
}
export function FCWInfo(num){
  switch (num) {
    case '耗材费' : return 1
    case '教材费' : return 2
    case '场地费' : return 3
    case '会务费' : return 4
    case '鉴定费' : return 5
    case '接待费' : return 6
    case '交通费' : return 7
    case '汽车费' : return 8
    case '食宿费' : return 9
    case '生活补贴' : return 10
    case '提成费用' : return 11
    case '授课费用' : return 12
    case '带班费用' : return 13
    case '加班费用' : return 14
    case '出差补贴' : return 15
    case '预计收入' : return 16
  }
}

//将文件按照二进制进行读取
export function readFile(file){
  return new Promise(resolve =>{
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = ev => {
      resolve (ev.target.result)
    }
  })
}

//学生信息字段对应表
export let stuCharacter = {
  STU_name: {
    text: '学员姓名',
    type: 'string'
  },
  STU_sf_id: {
    text: '身份证号',
    type: 'string'
  },
  STU_gender: {
    text: '性别',
    type: 'string'
  },
  STU_age: {
    text: '年龄',
    type: 'string'
  },
  STU_phone: {
    text: '手机号码',
    type: 'string'
  },
  STU_nation: {
    text: '所属民族',
    type: 'string'
  },
  STU_employment_status: {
    text: '就业状态',
    type: 'string'
  },
  STU_detail_address: {
    text: '户籍详细地址',
    type: 'string'
  },
  STU_current_address: {
    text: '现居地址',
    type: 'string'
  },
  STU_education: {
    text: '文化程度',
    type: 'string'
  },
  STU_major: {
    text: '专业',
    type: 'string'
  },
  STU_political_affiliation: {
    text: '政治面貌',
    type: 'string'
  },
  STU_personnel_category: {
    text: '学员类型',
    type: 'string'
  },
  STU_health_status: {
    text: '健康状态',
    type: 'string'
  },
  STU_insureType: {
    text: '保险类型',
    type: 'string'
  },
  STU_employer: {
    text: '归属单位',
    type: 'string'
  },
  STU_filed_account: {
    text: '是否属于扶贫建档立卡户',
    type: 'string'
  },
  AD_cid: {
    text: '招生老师身份证号',
    type: 'string'
  },
  AD_name: {
    text: '招生老师姓名',
    type: 'string'
  },
}
