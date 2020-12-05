import axios from 'axios';

export const schoolList = new Promise((resolve, reject) => {
  axios.get("/api/meta/college", {}).then((res => {
    resolve(res.data.data);
  })).catch((error) => {
    reject(error);
  })
})

export function getSchRegion(schids,) {
  console.log("刚进入getSchRegion时" + schids.length);

  return new Promise((resolve, reject) => {
    axios.get("/api/base/college", {
      params: {
        cidList: schids.join(",")
      },
    }).then((res => {
      console.log("进入了getSchRegion后" + res.data.data.length);
      console.log("status = " + res.status)
      resolve(res.data.data);
    })).catch((error) => {
      console.log("错误", error)
      reject(error);
    })
  })
}

export function getResultTest(schNames) {
  console.log("进入了getTest!");
  return new Promise((resolve) => {
    var name_id = [];
    var mapresult = [];
    schoolList.then(res => {
      for (let i = 0; i < res.length; i++) {
        name_id[res[i].cname] = res[i].cid;
      }
      for (let i = 0; i < schNames.length; i++) {
        getSchRegion(name_id[schNames[i]]).then(res => {
          var loc = res.location;
          let i = 0;
          for (i = 0; i < mapresult.length; i++) {
            if (mapresult[i].name === loc) {
              mapresult[i].value += 1;
              break;
            }
          }
          if (i === mapresult.length) {
            mapresult.push({name: loc, value: 1});
          }
        }).catch(error => {
          console.log(error);
        })
      }
      resolve(mapresult);
    })
  })
}

