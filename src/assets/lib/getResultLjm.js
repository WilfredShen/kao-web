import axios from "axios";

export function disciplineList() {
  return new Promise((resolve, reject) => {
    axios.get("/api/meta/discipline")
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function majorList() {
  return new Promise((resolve, reject) => {
    axios.get("/api/meta/major")
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function schoolList() {
  return new Promise((resolve, reject) => {
    axios.get("/api/meta/college")
      .then((res) => {
        //           console.log("res",res.data)
        resolve(res.data.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getEvaluationList(sRound) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/base/evaluation?round=${sRound}`, {})
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function schoolDetail(cid) {
  return new Promise((resolve, reject) => {
    axios.get("/api/base/college", {
      params: {
        cidList: cid.join(",")
      }
    })
      .then((res) => {
        console.log("res", res.data);
        resolve(res.data.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function setFavouriteMajor(favorList) {
  return new Promise((resolve, reject) => {
    axios.post("/api/favor/p/major", favorList)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
        console.log("获取失败！");
      });
  });
}

export function setFavouriteTutor(favorList) {
  return new Promise((resolve, reject) => {
    axios.post("/api/favor/p/tutor", favorList)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
        console.log("获取失败！");
      });
  });
}

export function rankList(scid) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/base/latest-college-rank?cid=${scid}`)
      .then((res) => {
        // console.log("res",res.data)
        resolve(res.data.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function rateList(scid) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/base/acceptance-rate?cid=${scid}`)
      .then((res) => {
        console.log("录取率", res.data);
        resolve(res.data.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function tutorList(scid) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/base/tutor?cid=${scid}`)
      .then((res) => {
        // console.log("res",res.data)
        console.log("导师信息", res.data);
        resolve(res.data.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}


//某一轮评估结果
export function getSomeResult() {
  return new Promise((resolve, reject) => {
    axios.get("/api/base/evaluation")
      .then((res) => {
        console.log(resolve);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
        console.log(err);
      });
  });
}

//最近新闻
export function getLatestNews() {
  return new Promise((resolve, reject) => {
    axios.get("/api/base/latest-news")
      .then((res) => {
        // console.log(resolve);
        // console.log(res);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
        console.log(err);
      });
  });
}

//获取学校各个排行榜最新的排名
export function getLastestCollegeRank() {
  return new Promise((resolve, reject) => {
    axios.get("/api/base/college-rank")
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((err) => {
        reject(err.data);
        console.log(err);
      });
  });
}

//获取所有轮次
export function getAllRound() {
  return new Promise((resolve, reject) => {
    axios.get("/api/meta/round")
      .then((res) => {
        console.log(resolve);
        resolve(res.data.data);
      })
      .catch((err) => {
        reject(err.data);
        console.log(err);
      });
  });
}
