import axios from 'axios'

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

export function getUserName() {
  return new Promise((resolve, reject) => {
    axios.get("/api/user/get_user_info")
      .then(res => {
        let item = res.data.data;
        resolve(item.username);
      })
      .catch(err => {
        reject(err);
      })
  })
}

export function getLimit() {
  return new Promise((resolve, reject) => {
    axios.get("/api/user/get_user_info")
      .then(res => {
        let item = res.data.data;
        resolve(item.accountType);
      })
      .catch(err => {
        reject(err);
      })
  })
}

export function updateStuInfo(uid, phone, email, college, major, expmajor, gradt) {

  return new Promise((resolve, reject) => {
    axios.post("/api/stu/update_stu_info", {
      'queryable': true,
      'uid': uid,
      'phoneNumber': phone,
      'email': email,
      'college': college,
      'major': major,
      'expectedMajor': expmajor,
      'graduationDate': gradt
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
}

export function updateTeaInfo(phone, email, college, major, research) {
  return new Promise((resolve, reject) => {
    axios.post("/api/tutor/update_tutor_msg", {
      'phoneNumber': phone,
      'email': email,
      'college': college,
      'major': major,
      'research': research
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
}

export function updateUserInfo(postphone, postemail) {
  return new Promise(((resolve, reject) => {
    axios.post("/api/user/update_user_msg", {
      'phoneNumber': postphone,
      'email': postemail,
      'accountType': null,
    })
      .then(res => {
        console.log("成功", res);
        resolve(res.status);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      })
  }))
}
