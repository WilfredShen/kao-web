import axios from "axios";

export function disciplineList() {
    return new Promise((resolve, reject) => {
        axios.get("/api/meta/discipline", {}).then((res => {
            // console.log("res",res.data)
            resolve(res.data.data);
        })).catch((error) => {
            reject(error);
        })
    })
}

export function majorList() {
    return new Promise((resolve, reject) => {
        axios.get("/api/meta/major", {}).then((res => {
            resolve(res.data.data);
        })).catch((error) => {
            reject(error);
        })
    })
}

export function schoolList() {
    return new Promise((resolve, reject) => {
        axios.get(`/api/meta/college`, {}).then((res => {
            //           console.log("res",res.data)
            resolve(res.data.data);
        })).catch((error) => {
            reject(error);
        })
    })
}

export function getevaluationList(sround) {
    return new Promise((resolve, reject) => {
        axios.get(`/api/base/evaluation?round=${sround}`, {}).then((res => {
//             console.log("evaluation",res.data)
            resolve(res.data.data);
        })).catch((error) => {
            reject(error);
        })
    })
}
export function schooldetail(cid) {
  console.log(cid);
    return new Promise((resolve, reject) => {
        axios.get("/api/base/college", {
          params:{
            cidList:cid.join(",")
          }
        }).then((res => {
            console.log("res",res.data)
            resolve(res.data.data);
        })).catch((error) => {

            reject(error);
        })
    })
}
