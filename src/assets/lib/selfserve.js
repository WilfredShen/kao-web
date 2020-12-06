import axios from 'axios';
export function updateUserInfo(postphone,postemail) {
  return new Promise(((resolve, reject) => {
    axios.post("/api/user/update_user_msg", {
      'phoneNumber': postphone,
      'email': postemail,
      'accountType': null,
    })
      .then(res => {
        console.log(res.status);
        resolve(res.status);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      })
  }))
}

export function getUserid() {
  return new Promise((resolve, reject) => {
    axios.get("/api/user/get_user_info")
      .then(res => {
        let item = res.data.data;
        resolve(item.uid);
      })
      .catch(err => {
        reject(err);
      })
  })
}

