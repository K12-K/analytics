import Cookies from "js-cookie";

export function getCookie(name: string) {
  return Cookies.get(name);
}

export function setCookie(
  name: string,
  value: string,
  expires = 365
) {
  Cookies.set(name, value, {
    expires,
  });
}

export function removeCookie(name: string) {
  Cookies.remove(name);
}