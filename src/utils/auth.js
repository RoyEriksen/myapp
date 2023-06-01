import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';

import { writable } from 'svelte/store';

const emptyAuth = {
  "token": "",
  "userId": "",
  "username": ""
}

export const isLoggedInStore = writable(false);

export function logOut() {
  localStorage.removeItem("isLoggedIn");
  localStorage.setItem("auth", JSON.stringify(emptyAuth));
  isLoggedInStore.set(false);
  return true;
}

export function getUserId() {
  const auth = localStorage.getItem("auth")
  if (auth) {
    return JSON.parse(auth)["userId"]
  }
  return null
}

// Added getUsername function to retrieve the username
export function getUsername() {
  const auth = localStorage.getItem("auth");
  if (auth) {
    return JSON.parse(auth)["username"];
  }
  return null;
}

export function getTokenFromLocalStorage() {
  const auth = localStorage.getItem("auth")
  if (auth) {
    return JSON.parse(auth)["token"]
  }
  return null
}

export async function checkIsLoggedIn() {
  if (!getTokenFromLocalStorage()) {
    return false
  }

  try {
    const resp = await fetch(
      PUBLIC_BACKEND_BASE_URL + '/api/collections/users/auth-refresh',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getTokenFromLocalStorage()
        },
      }
    );

    const res = await resp.json()
    if (resp.status == 200) {

      localStorage.setItem("auth", JSON.stringify({
        "token": res.token,
        "userId": res.record.id,
        "username": res.record.username
      }));
      isLoggedInStore.set(true);
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

export async function authenticateUser(username, password) {
  const resp = await fetch(
    PUBLIC_BACKEND_BASE_URL + '/api/collections/users/auth-with-password',
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identity: username,
        password
      })
    }
  );

  const res = await resp.json();

  if (resp.status == 200) {
    localStorage.setItem("auth", JSON.stringify({
      "token": res.token,
      "userId": res.record.id,
      "username": res.record.username
    }));

    localStorage.setItem("isLoggedIn", "true");
    isLoggedInStore.set(true);
    return {
      success: true,
      res: res
    }
  }

  return {
    success: false,
    res: res
  }
}

export function getIsLoggedIn() {
  return !!localStorage.getItem("isLoggedIn");
}