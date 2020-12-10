import axios from "axios";

export function disciplineList() {
  return new Promise((resolve, reject) => {
    axios.get("/api/meta/discipline", {})
      .then((res => {
        // console.log("res",res.data)
        resolve(res.data.data);
      }))
      .catch((error) => {
        reject(error);
      })
  })
}

export function majorList() {
  return new Promise((resolve, reject) => {
    axios.get("/api/meta/major", {})
      .then((res => {
        resolve(res.data.data);
      }))
      .catch((error) => {
        reject(error);
      })
  })
}

export function schoolList() {
  return new Promise((resolve, reject) => {
    axios.get(`/api/meta/college`, {})
      .then((res => {
        //           console.log("res",res.data)
        resolve(res.data.data);
      }))
      .catch((error) => {
        reject(error);
      })
  })
}

export function getEvaluationList(sround) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/base/evaluation?round=${sround}`, {})
      .then((res => {
//             console.log("evaluation",res.data)
        resolve(res.data.data);
      }))
      .catch((error) => {
        reject(error);
      })
  })
}

export function schoolDetail(cid) {
  console.log(cid);
  return new Promise((resolve, reject) => {
    axios.get("/api/base/college", {
      params: {
        cidList: cid.join(",")
      }
    })
      .then((res => {
        console.log("res", res.data)
        resolve(res.data.data);
      }))
      .catch((error) => {

        reject(error);
      })
  })
}

export function setfavouritemajor(favorlist) {
  console.log("favor" + favorlist)
  return new Promise((resolve, reject) => {
    axios.post("/api/favor/p/major", favorlist)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
        console.log("获取失败！")
      })
  })
}
