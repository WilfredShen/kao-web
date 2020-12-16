export function readFile(file) {
  return new Promise(resolve => {
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = ev => {
      resolve(ev.target.result);
    };
  })
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


export function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

export function checkMobile(str) {
  const re = /^1[0-9]{10}$/;
  return re.test(str);
}

export function checkEmail(str) {
  const re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  if (re.test(str)) {
    alert("正确");
  } else {
    alert("错误");
  }
}

export function isPasswd(s) {
  const paTrn = /^(\w){6,20}$/;
  return paTrn.exec(s);
}

export function checkPass(str) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{6,10}$/;
  return re.test(str);
}

