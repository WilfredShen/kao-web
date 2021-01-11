import {schoolList} from './getResultLjm'

export function readFile(file) {
  return new Promise(resolve => {
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (ev) => {
      resolve(ev.target.result);
    };
  });
}

export function getCookie(value) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].substring(0, value.length) === value) {
      return cookies[i].substring(value.length + 1);
    }
  }
  return null;
}

export function setCookie(cname, cValue, exDays) {
  const d = new Date();
  d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cValue + "; " + expires + "; path=/";
}

export function checkMobile(str) {
  const re = /^1[0-9]{10}$/;
  return re.test(str);
}

export function getSchMap(self) {
  const schMap = new Map();
  if (JSON.stringify(self.$store.state.schoolMap) !== '{}') {
    let sMap = self.$store.state.schoolMap;
    for (const key in sMap) {
      schMap.set(sMap[key], key);
    }
  } else {
    schoolList()
      .then((res) => {
        res.forEach(row => {
          schMap.set(row.cname, row.cid);
          this.$store.commit("setSchMap", {
            cname: row.cname,
            cid: row.cid
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return schMap;
}

