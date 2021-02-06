import axios from 'axios';

const Api = { }
const TOKEN_URL = '...'
Api.RegisterApi = (user) => {
    return axios.post(`http://127.0.0.1:8000/rest-auth/registration/`, user)
}
Api.LoginApi = (Loginuser) => {
    return axios.post(`http://127.0.0.1:8000/rest-auth/login/`, Loginuser)
}

export default Api;