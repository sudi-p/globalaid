import { deleteCookie, getCookie, setCookie } from "cookies-next";

enum CookieKeys {
  ACCESS_TOKEN = 'accessToken',
  USER = 'user',
  ACCOUNT = 'account_type',
}

type UserInterface = {

}

export const addAuthToStorage = (user) => {
  setCookie(CookieKeys.USER, user);
}

export const getUserFromStorage = () => {
  let user = getCookie(CookieKeys.USER);
  if (user) return JSON.parse(user);
}

export const getAccessToken = () => {
  let user = getCookie(CookieKeys.USER);
  if (user){
    user = JSON.parse(user);
    return user;
  }
}

export const clearAuthFromStorage = () => {
  deleteCookie(CookieKeys.USER);
};
