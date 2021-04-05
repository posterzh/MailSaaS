import axios from "axios";
import { store } from "../redux/store/store";
import { makeTokenKeyword } from "../utils/Utils";

const TOKEN_KEY = "access_token";

class Api {
  constructor() {
    this.api = axios.create();

    const token = localStorage.getItem(TOKEN_KEY);
    this.setToken(token);
  }

  setToken(token) {
    if (token) {
      const socialType = store.getState().auth.socialType;
      const tokenKeyword = makeTokenKeyword(socialType);
      this.api.defaults.headers.common["Authorization"] = `${tokenKeyword} ${token}`;
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      // Delete auth header
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem(TOKEN_KEY);
    }
  }

  get(url, params) {
    const token = localStorage.getItem(TOKEN_KEY);
    this.setToken(token);

    return this.api.get(url, { params });
  }

  post(url, data) {
    const token = localStorage.getItem(TOKEN_KEY);
    this.setToken(token);

    return this.api.post(url, data);
  }

  put(url, data) {
    const token = localStorage.getItem(TOKEN_KEY);
    this.setToken(token);

    return this.api.put(url, data);
  }

  patch(url, data) {
    const token = localStorage.getItem(TOKEN_KEY);
    this.setToken(token);

    return this.api.patch(url, data);
  }

  delete(url, data) {
    const token = localStorage.getItem(TOKEN_KEY);
    this.setToken(token);

    return this.api.delete(url, data);
  }
}

export default new Api();
