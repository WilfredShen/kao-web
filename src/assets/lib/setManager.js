import axios from "axios";

//上传评估结果
export function uploadEvaluation(cid, mid, result, round) {
  return new Promise((resolve, reject) => {
    axios.post('/api/admin/p/evaluation', {
      "cid": cid,
      "mid": mid,
      "result": result,
      "round": round,
    })
      .then((res) => {
        resolve(res);
        console.log("成功", cid, mid, result, round);
      })
      .catch((err) => {
        reject(err.data);
        console.log(err);
        console.log("失败", cid, mid, result, round);
      });
  });
}

//更新评估结果
export function updateEvaluation(cid, mid, result, round) {
  return new Promise((resolve, reject) => {
    axios.post('/api/admin/u/evaluation', {
      "cid": cid,
      "mid": mid,
      "newResult": result,
      "round": round,
    })
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

//上传新闻
export function uploadNews(cid, date, title, content, image, offcialLink) {
  return new Promise((resolve, reject) => {
    axios.post('/api/admin/p/news', {
      "cid": cid,
      "date": date,
      "title": title,
      "content": content,
      "image": image,
      "offcialLink": offcialLink,
    })
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

//获得新闻列表
export function getNews() {
  return new Promise((resolve, reject) => {
    axios.get('/api/admin/q/news' )
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

//更改新闻
export function alterNews(cid, date, title, content, image, offcialLink) {
  return new Promise((resolve, reject) => {
    axios.post('/api/admin/u/news', {
      "cid": cid,
      "date": date,
      "title": title,
      "content": content,
      "image": image,
      "offcialLink": offcialLink,
    })
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


