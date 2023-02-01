import axios from "axios";

const API_KEY = 'AIzaSyDrRl6Lje6FM1mgavZcu_CUowsEZRYGttg';

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email, password, returnSecureToken: true,
  });

  return response.data.idToken;
}

export function createUser(email, password) {
  return authenticate('signUp', email, password);
}

export function login(email, password) {
  return authenticate('signInWithPassword', email, password);
}