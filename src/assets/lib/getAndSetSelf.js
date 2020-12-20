import axios from 'axios'

export function getUserId() {
  return new Promise((resolve, reject) => {
    axios.get("/api/user/q/user-info")
      .then(res => {
        let item = res.data.data;
        resolve(item.uid);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function getUserName() {
  return new Promise((resolve, reject) => {
    axios.get("/api/user/q/user-info")
      .then(res => {
        let item = res.data.data;
        resolve(item.username);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function getLimit() {
  return new Promise((resolve, reject) => {
    axios.get("/api/user/q/user-info")
      .then(res => {
        let item = res.data.data;
        resolve(item.accountType);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function updateStuInfo(uid, phone, email, college, major, expectedMajor, graduation) {
  return new Promise((resolve, reject) => {
    axios.post("/api/stu/u/stu-info", {
      'queryable': true,
      'uid': uid,
      'phoneNumber': phone,
      'email': email,
      'college': college,
      'major': major,
      'expectedMajor': expectedMajor,
      'graduationDate': graduation
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function updateTeaInfo(phone, email, college, major, research) {
  return new Promise((resolve, reject) => {
    axios.post("/api/tutor/u/tutor-info", {
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
      });
  });
}

export function updateUserInfo(postPhone, postEmail) {
  return new Promise((resolve, reject) => {
    axios.post("/api/user/u/user-info", {
      'phoneNumber': postPhone,
      'email': postEmail,
      'accountType': null,
    })
      .then(res => {
        console.log("成功", res);
        resolve(res.status);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}
