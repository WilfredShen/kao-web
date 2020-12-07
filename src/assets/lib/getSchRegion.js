import axios from 'axios';

export function getSchRegion(schids,) {
  return new Promise((resolve, reject) => {
    axios.get("/api/base/college", {
      params: {
        cidList: schids.join(",")
      },
    })
      .then((res => {
        resolve(res.data.data);
      }))
      .catch((error) => {
        reject(error);
      })
  })
}


