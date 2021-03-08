import axios from "axios";

const TOKEN_KEY = "access_token";

class Api {
  constructor() {
    this.api = axios.create();

    const token = localStorage.getItem(TOKEN_KEY);
    this.setToken(token);
  }

  setToken(token) {
    if (token) {
      this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      // Delete auth header
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem(TOKEN_KEY);
    }
  }

  get(url, params) {
    return this.api.get(url, { params });
  }

  post(url, data) {
    return this.api.post(url, data);
  }

  put(url, data) {
    return this.api.put(url, data);
  }

  patch(url, data) {
    return this.api.patch(url, data);
  }

  delete(url, data) {
    return this.api.delete(url, data);
  }
}

export default new Api();
