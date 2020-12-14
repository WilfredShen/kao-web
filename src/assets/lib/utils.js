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




