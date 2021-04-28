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

//性别转换
export function formatSex(num){
  switch (num){
    case 1: return '男'
    case 2: return '女'
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
//是否
export function isNot(num){
  switch (num) {
    case 1: return "是"
    case 2: return "否"
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
