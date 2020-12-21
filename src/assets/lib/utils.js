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
  document.cookie = cname + "=" + cValue + "; " + expires;
}

export function checkMobile(str) {
  const re = /^1[0-9]{10}$/;
  return re.test(str);
}


