import axios from 'axios';

const getToken = (tokenkey) => {
  if (!tokenkey) {
    tokenkey = "token"
  }
  let token = '';
  if (document.cookie) {
    const cookie = document.cookie;
    let cookie_array = cookie.split(';');
    for (let i = 0; i < cookie_array.length; i++) {
      let key = cookie_array[i].substr(0, cookie_array[i].indexOf("="));
      key = key.replace(/^\s+|\s+$/g, "");
      if (key === tokenkey) {
        let val = cookie_array[i].substr(cookie_array[i].indexOf("=") + 1);
        if (tokenkey === "token") {
          token = "Token " + val;
        } else {
          token = val;
        }
      }
    }
  }
  return token
}

export default function getClient() {
  let url = 'https://www.onlineglobalaid.com/api'
  if (process.env.NODE_ENV !== 'production') {
    url = 'http://localhost:3001/api'
  }
  return axios.create({
    baseURL: url,
    timeout: 35000,
    headers: {
      Accept: 'application/json',
      Authorization: getToken()
    },
  });
}