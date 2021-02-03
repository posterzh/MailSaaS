import axios from 'axios';

const Api={}
Api.RegisterApi = (user)=>{
    return axios.post(`http://127.0.0.1:8000/users/rest-auth-register/`,user )
}
Api.Login=()=>{

}
export default Api;