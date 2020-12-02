import axios from 'axios';
//获得所有学科代码及名称
export function getdiscipline() {
  return new Promise((resolve, reject) => {
    axios.get('/api/meta/discipline', {}).then((res) => {
      console.log(resolve);
      resolve(res.data);
    }).catch((err) => {
      reject(err.data);
      console.log(err)
    })
  })
}
//获得所有专业代码及名称
export function getmajor() {
  return new Promise((resolve, reject) => {
    axios.get('/api/meta/major', {}).then((res) => {
      console.log(resolve);
      resolve(res.data);
    }).catch((err) => {
      reject(err.data);
      console.log(err)
    })
  })
}
//获取所有学校代码及名称
export function getschool() {
  return new Promise((resolve, reject) => {
    axios.get('/api/meta/college', {}).then((res) => {
      console.log(resolve);
      resolve(res.data);
    }).catch((err) => {
      reject(err.data);
      console.log(err)
    })
  })
}
//某一轮评估结果
export function getsomeresult() {
  return new Promise((resolve, reject) => {
    axios.get('/api/base/evaluation', {})
      .then((res) => {
        console.log(resolve);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
        console.log(err)
      })
  })
}
//最近新闻
export function getlatestnews() {
  return new Promise((resolve, reject) => {
    axios.get('/api/base/evaluation', {})
      .then((res) => {
        console.log(resolve);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
        console.log(err)
      })
  })
}
