import axios from 'axios';

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

export function getmajor() {
  return new Promise((resolve, reject) => {
    axios.get('/api/meta/major', {}).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err.data);
      console.log(err)
    })
  })
}

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

export function getsomeresult() {
  return new Promise((resolve, reject) => {
    axios.get('/api/base/evaluation', {}).then((res) => {
      console.log(resolve);
      resolve(res.data);
    }).catch((err) => {
      reject(err.data);
      console.log(err)
    })
  })
}
